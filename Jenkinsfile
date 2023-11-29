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
                withCredentials([file(credentialsId: '9dca2753-b85b-4e5a-b9ee-e5af21499068', variable: 'ENV_FILE')]) {
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
        }
    }
}