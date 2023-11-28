pipeline {
    agent any

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
        }
        success {
            script {
                // Notify GitHub about the success
                githubNotify account: 'yourGitHubAccount', repo: 'yourRepo', context: 'CI', status: 'SUCCESS', description: 'The build succeeded!'
            }
            echo 'Pipeline successfully executed'
        }
        failure {
            script {
                // Notify GitHub about the failure
                githubNotify account: 'yourGitHubAccount', repo: 'yourRepo', context: 'CI', status: 'FAILURE', description: 'The build failed!'
            }
            echo 'Pipeline failed'
        }
    }
}