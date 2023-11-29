pipeline {
    agent any
    
    environment {
        // Define necessary environment variables
        REPO = 'csherman.net' // Replace with your GitHub repository name
        ACCOUNT = 'christophersherman' // Replace with your GitHub account or organization name
        CREDENTIALS_ID = '483e6f5e-fb3f-462b-a20f-ebaf46c32ff5' // Replace with your Jenkins credentials ID for GitHub
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Environment') {
            steps {
                withCredentials([file(credentialsId: 'ed5e96d5-7a37-46b5-a0ed-732a6fe16547', variable: 'ENV_FILE')]) {
                    script {
                        sh 'cat $ENV_FILE > .env'  // Write the secret file content to a .env file
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose -f docker-compose.yml build'
            }
        }

        stage('Run Tests') {
            steps {
                // Bring up the services including test dependencies
                sh 'docker-compose -f docker-compose.test.yml up -d'
                echo 'sleepy time'
                sh 'sleep 10' 
                // Run the test commands
                sh 'docker-compose -f docker-compose.test.yml run flask-app python -m unittest'
                // Shut down the services after tests
                sh 'docker-compose -f docker-compose.test.yml down'
            }
        }
    }
    post {
        always {
            // Clean up Docker
            sh 'docker-compose -f docker-compose.test.yml down -v'
            // Remove the .env file 
            sh 'rm -f .env'
            script {
                // Define the check's title and summary
                def title = 'Build'
                def summary = currentBuild.result == 'SUCCESS' ? 'Build succeeded' : 'Build failed'
                def conclusion = currentBuild.result == 'SUCCESS' ? 'SUCCESS' : 'FAILURE'

                // Construct details URL (optional, provide a link to build results)
                def detailsURL = "${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/"
                echo detailsURL
                echo 'hey'
                // Publish the check to GitHub
                publishChecks name: 'CI', title: title, summary: summary, detailsURL: detailsURL, conclusion: conclusion
            }
        }
    }
}