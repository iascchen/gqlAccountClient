# gqlAccountClient

React Client for gqlAccount Center

## 启用和运行

依赖于一个后台服务：

* Account Center 用于用户注册和认证访问

### 设置环境变量

复制本地环境变量 `cp .env.example .env` 根据实际情况设置。
需要注意此处的 `REACT_APP_HEADER_FOR_AUTH` 需要在Domain内部的各应用间保持一致

    # GraphQL Account Center
    REACT_APP_ACCOUNT_CENTER=https://<account-center-internet-host>:<port>
    
    REACT_APP_HEADER_FOR_AUTH=token
    REACT_APP_PASSWORD_RESET_TOKEN_LEN=6
    # invite and reset password token will be expired in INVITE_TOKEN_TTL seconds
    REACT_APP_INVITE_TOKEN_TTL=60

### Run

Run in dev mode

    yarn
    yarn start

Deploy to static web server, 运行 build 命令后，将 build 目录的内容复制到 Web 服务器的 Web-Root 下。
    
    yarn build

## Run with Docker in develop mode
    
    ./docker_builder.sh
    ./docker_run.sh

访问 [http://localhost:9001](http://localhost:9001)

**Attention** For production mode, please set the ENV of container according your deployment

## 已知问题

尚未对接短信发送手机验证吗服务，需要知晓 ResetToken，只能够请 管理员查看数据路，user 表里的 resetPasswordToken 或 invite 表中的 token 
