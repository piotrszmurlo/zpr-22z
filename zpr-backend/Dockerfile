FROM python:3.10 AS base
WORKDIR /code
COPY . /code
RUN pip install pipenv
RUN python -m pipenv sync
RUN pipenv install
RUN pip install -r requirements.txt
CMD ["python", "app.py"]