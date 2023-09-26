pipeline {

    environment {
        APP_NAME = "marto-app"
        APP_TAG = "${BUILD_NUMBER}"
        USER_NAME = "martooo"
        USER_PASS = "arquitectura123"
        REPO_GIT = "https://github.com/martinsendati/app-jenkins"
        REPO_GIT_INFRA = "https://github.com/martinsendati/infra-appchart.git"
   }


    agent {
       kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: slave
  name: agent-pod
spec:
  containers:
  - name: agent-container
    image: tferrari92/jenkins-inbound-agent-git-npm-docker
    command:
    - sleep
    args:
    - "99"
    env:
    resources:
      limits: {}
      requests:
        memory: "256Mi"
        cpu: "100m"
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: volume-0
      readOnly: false
    - mountPath: /home/jenkins/agent
      name: workspace-volume
      readOnly: false
  hostNetwork: false
  nodeSelector:
    kubernetes.io/os: "linux"
  restartPolicy: Never
  volumes:
  - emptyDir:
      medium: ""
    name: workspace-volume
  - hostPath:
      path: /var/run/docker.sock
    name: volume-0
'''
            defaultContainer 'agent-container'
        }
}
  
    stages {

        stage('Clonando repo de aplicación') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: "$REPO_GIT"
            }
        } 

        stage('Creando la imagen') {
            steps {
                sh "docker build -t $USER_NAME/$APP_NAME:$APP_TAG ." 
            }
        }

        stage('Loguenado a DockerHub') {
            steps {
                sh "docker login -u $USER_NAME -p $USER_PASS"
            }
        }

        stage('Pusheadno imagen a DockerHub') {
            steps {
                sh "docker push $USER_NAME/$APP_NAME:$APP_TAG "
            }
        } 
        stage('Clonando repo de infraestructura de la app') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: "$REPO_GIT_INFRA"
            }
        }
        stage('Modificando el deployment') {
            steps {
                sh "sed -i s/marto-app:.*/marto-app:$APP_TAG/g mi-app/marto-deployment.yaml"
            }
        }
        stage('Pushendo cambios de versión') {
            steps {
                sh "git add mi-app/marto-deployment.yaml"
                sh "git config --global user.email 'martin.barrionuevo@sendati.com'"
                sh "git config --global user.name 'martinsendati'"
                sh "git commit -m 'cambio de versión'"
                withCredentials([usernamePassword(credentialsId: "credenciales-github", passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/martinsendati/infra-app-jenkins.git')
            }
            }
        }
    } 
}
