FROM python:3.8-slim-buster
LABEL maintainer="yobot"

ENV PYTHONIOENCODING=utf-8

ADD src/client/ /yobot

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' >/etc/timezone \
    && apt update \
    && apt upgrade -y \
    && apt install build-essential -y \
    && cd /yobot \
    && pip3 install aiocqhttp==1.4.3 Quart==0.18.3 --no-cache-dir \
    && pip3 install -r requirements.txt --no-cache-dir \
    && python3 main.py \
    && chmod +x yobotg.sh

WORKDIR /yobot

EXPOSE 9222

VOLUME /yobot/yobot_data

ENTRYPOINT /yobot/yobotg.sh
