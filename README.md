
# n8n_local_runner

A utility to run **n8n** locally with an **ngrok** tunnel, enabling seamless local execution and resolving common connectivity issues.

---

## Getting Started

### Prerequisites

- **ngrok**

To install and configure `ngrok`, execute the following commands:

```bash
curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
  | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
  && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
  | sudo tee /etc/apt/sources.list.d/ngrok.list \
  && sudo apt update \
  && sudo apt install ngrok
````

After installation, authenticate your `ngrok` client by adding your authtoken:

```bash
ngrok config add-authtoken $YOUR_AUTHTOKEN
```

* **n8n**

Install `n8n` globally using npm:

```bash
npm install -g n8n
```

---

## Usage

To start the local runner with an ngrok tunnel, run:

```bash
npx n8n-local-runner
```

---

## Overview

This tool facilitates running the **n8n** workflow automation platform locally while exposing it through a secure **ngrok** tunnel. This helps to overcome common limitations related to local network accessibility and webhook reception during development.

---
## License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

## Author

Developed by **Yasir**  
[Optional: Add contact info, website, or GitHub link here]
