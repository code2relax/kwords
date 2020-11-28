node {
    stage('Build') {
        echo 'Building....'
	git 'https://github.com/code2relax/kwords'
        script {
          docker.build "code2relax:$BUILD_NUMBER"
        }
    }
    stage('Test') {
        echo 'Testing....'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
