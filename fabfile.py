from fabric.api import run, env, sudo, cd, prefix, shell_env

env.hosts = ['108.61.241.53']
env.user = 'jordan'

DIR = '/home/jordan/draw'
VENV = 'echo Hello'


def start():
    with cd(DIR):
        with shell_env(PATH='/home/jordan/.nvm/versions/node/v6.10.3/bin:$PATH'):
            with prefix(VENV):
                run('pm2 start app.js > start.log')
                run('echo narf')


def stop():
    run('pm2 stop all > stop.log')


def deploy():
    with cd(DIR):
        run('git pull')

        with prefix(VENV):
            run('npm install  > install.log')

        run('pm2 restart all > restart.log')


def hello():
    print("Hello")
