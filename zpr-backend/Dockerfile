FROM python:3.10 AS base
WORKDIR /code
COPY . /code
RUN python3 -m pip install pipenv && pipenv sync
