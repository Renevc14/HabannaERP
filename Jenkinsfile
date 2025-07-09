pipeline {
  agent any

  environment {
    IMAGE_NAME = 'renevc14/habannaerp'
    DOCKER_USER = 'renevc14'
  }



  stages {
    stage('Debug: Git y entorno') {
      steps {
        bat 'git --version'
        bat 'where git'
        bat 'echo RUTA ACTUAL: %CD%'
        bat 'dir'
      }
    }

    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/renevc14/HabannaERP.git'
      }
    }

    stage('Debug: Post-checkout') {
      steps {
        bat 'echo RUTA TRAS CHECKOUT: %CD%'
        bat 'git status'
        bat 'git log -1'
        bat 'git rev-parse --abbrev-ref HEAD'
        bat 'dir'
      }
    }

    stage('Debug: Branch Detectado') {
      steps {
        script {
          def rawOutput = bat(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
          def lines = rawOutput.readLines()
          def branchName = lines[-1].trim()
          echo "Resultado limpio de 'git rev-parse --abbrev-ref HEAD': ${branchName}"
        }
      }
    }

    stage('Install') {
      steps {
        bat 'node -v'
        bat 'npm -v'
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
          def rawOutput = bat(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
          def lines = rawOutput.readLines()
          def branchName = lines[-1].trim()
          def tag = (branchName == "main") ? "prod" : "dev"
          echo "Construyendo imagen con tag: ${tag}"
          bat "docker --version"
          bat "docker build -t ${IMAGE_NAME}:${tag} ."
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([string(credentialsId: 'dockerhubpwd', variable: 'DOCKERHUB_PWD')]) {
          script {
            def rawOutput = bat(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
            def lines = rawOutput.readLines()
            def branchName = lines[-1].trim()
            def tag = (branchName == "main") ? "prod" : "dev"
            echo "Subiendo imagen a DockerHub con tag: ${tag}"
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
          def rawOutput = bat(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
          def lines = rawOutput.readLines()
          def branchName = lines[-1].trim()
          def tag = (branchName == "main") ? "prod" : "dev"
          def port = (tag == "prod") ? "8082" : "8081"
          def container = (tag == "prod") ? "HabannaERP-prod" : "HabannaERP-dev"

          echo "Desplegando contenedor ${container} en el puerto ${port}"
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
    failure {
      echo "Hubo un fallo en el pipeline. Revisa la etapa correspondiente."
    }
  }
}
