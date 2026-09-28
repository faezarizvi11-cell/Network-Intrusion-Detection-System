# Network Intrusion Detection System

## Overview

A machine learning-based Network Intrusion Detection System (IDS) that classifies network traffic as either **Benign** or **DoS Attack**.

The project uses network-flow features from the CICFlowMeter DoS Thursday 2018 dataset and provides a complete end-to-end pipeline:

**Data → Machine Learning → FastAPI → Web Interface → Deployment**
## Problem Statement

Denial-of-Service (DoS) attacks can disrupt network services by generating malicious traffic.

The goal of this project is to build a machine learning model that can identify whether a network flow is benign or represents a DoS attack.
