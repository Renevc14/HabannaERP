pipeline {
  agent any

  environment {
    IMAGE_NAME = 'renevc14/HabannaERP'
    DOCKER_USER = 'renevc14'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/renevc14/HabannaERP.git'
      }
    }

    stage('Install') {
      steps {
        bat 'npm install'
      }
    }

    stage('Build') {
      steps {
        bat 'npm run build'
      }
    }

    stage('Test') {
      steps {
        bat 'npm run test'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          def branchName = bat(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
          def tag = (branchName == "main") ? "prod" : "dev"
          bat "docker build -t ${IMAGE_NAME}:${tag} ."
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([string(credentialsId: 'dockerhubpwd', variable: 'DOCKERHUB_PWD')]) {
          script {
            def branchName = bat(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
            def tag = (branchName == "main") ? "prod" : "dev"
            bat """
              echo %DOCKERHUB_PWD% | docker login -u ${DOCKER_USER} --password-stdin
              docker push ${IMAGE_NAME}:${tag}
            """
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          def branchName = bat(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
          def tag = (branchName == "main") ? "prod" : "dev"
          def port = (tag == "prod") ? "8082" : "8081"
          def container = (tag == "prod") ? "HabannaERP-prod" : "HabannaERP-dev"

          bat """
            docker stop ${container} || exit 0
            docker rm ${container} || exit 0
            docker run -d --name ${container} -p ${port}:8080 ${IMAGE_NAME}:${tag}
          """
        }
      }
    }
  }

  post {
    always {
      echo "Pipeline finalizado"
    }
  }
}
