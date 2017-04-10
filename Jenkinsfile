#!groovy

node ('frontend-slave') {

  withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 's3-readwrite-dreem-fronts', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {

    stage('Install dependencies') {
      checkout scm
      sh 'npm install'
    }

    stage('Install amazon web services configuration') {
      sh 'pip install awscli'
      sh 'aws configure set preview.cloudfront true'
      sh 'aws configure set preview.create-invalidation true'
    }

    stage('Run tests') {
      sh 'npm run test'
    }

    stage('Build') {
      sh 'npm run build'
    }

    stage('Deploy') {
      sh 'npm run deploy'
    }
  }
}
