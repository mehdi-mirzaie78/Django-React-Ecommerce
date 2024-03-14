# Use an official Python runtime as a parent image
FROM python:3.11

# Set metadata for the image
LABEL maintainer="mehdimirzaie1378@gmail.com"
LABEL version="1.0.0"

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container to /src
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Upgrade pip and install any needed packages specified in requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy the current directory contents into the container at /src
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run gunicorn when the container launches
ENTRYPOINT [ "bash", "/app/entrypoint.sh" ]





