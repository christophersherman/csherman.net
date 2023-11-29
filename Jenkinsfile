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
                // Run the test commands
                sh 'docker-compose -f docker-compose.test.yml run flask-app python -m unittest'
                // Shut down the services after tests
                sh 'docker-compose -f docker-compose.test.yml down'
            }
        }
    }
    
}