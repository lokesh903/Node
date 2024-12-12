 

---

# Setting Up SSH Authentication and CI/CD Pipeline Using GitHub Actions  

## CI/CD Providers  

1. **TravisCI**  
2. **CircleCI**  
3. **Codeship**  
4. **AWS CodeBuild**  
5. **GitHub Actions**  

---

### TravisCI Flow (Not Free)  

1. Push code to GitHub.  
2. Travis detects the code push automatically.  
3. Travis clones the project.  
4. Travis runs tests using a `travis.yaml` file.  
5. If tests pass, Travis sends an email notification.  

---

## GitHub Actions  

Below later you will see an example of a `deploy` workflow file for GitHub Actions:  

---

## SSH Authentication Workflow  

### 1. Generate an SSH Key  

Run the following command to generate an SSH key:  
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```  
- Save the key as `/home/ubuntu/.ssh/id_ed25519`.  
- Set a passphrase if needed (optional).  

---

### 2. Start the SSH Agent  

Start the SSH agent:  
```bash
eval "$(ssh-agent -s)"
```  

---

### 3. Add the Private Key to the SSH Agent  

Add the private key to the SSH agent:  
```bash
ssh-add ~/.ssh/id_ed25519
```  

---

### 4. Add the Public Key to GitHub  

Display the public key:  
```bash
cat ~/.ssh/id_ed25519.pub
```  
Go to [GitHub Settings - SSH Keys](https://github.com/settings/keys) and add the public key with an appropriate name.  

---

### 5. Test SSH Authentication  

Test the SSH connection to GitHub:  
```bash
ssh -T git@github.com
```  
If successful, you will see a message like:  
```
Hi [username]! You've successfully authenticated, but GitHub does not provide shell access.
```  

---

### 6. Clone a GitHub Repository  

Now that the SSH key is set up, clone your repository:  
```bash
git clone git@github.com:[username]/[repository].git
```  

---

### 7. Configure NGINX for a Node.js App  

To make your app accessible on port 80, update the NGINX configuration (`/etc/nginx/sites-available/main`):  
```nginx
location ^~ /cicd-test {
    proxy_pass http://localhost:7000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```  

Update the routes in `index.js` accordingly to reflect the `/cicd-test` subpath.  

Restart NGINX to apply the changes:  
```bash
sudo systemctl restart nginx
```  

---

## GitHub Actions CI/CD Pipeline  

Here’s a complete GitHub Actions YAML file to test and deploy your Node.js app:  

```yaml
name: Node.js CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-22.04

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: Install and Test
      run: |
        npm install
        npm test
      env:
        CI: true

  deploy:
    needs: [test]
    runs-on: ubuntu-22.04

    steps:
    - name: Setup SSH Key
      run: |
        mkdir -p ~/.ssh
        echo "${{ secrets.SSH_KEY }}" > ~/.ssh/deploy_key
        chmod 600 ~/.ssh/deploy_key
        echo "Adding SSH host to known_hosts"
        ssh-keyscan -H "18.219.222.44" >> ~/.ssh/known_hosts  # Your server's IP

    - name: SSH and Deploy Node App
      run: |
        ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no ubuntu@18.219.222.44 << 'EOF'
          cd /var/www/html/cicd
          git pull origin main
          npm install --production
          pm2 restart cicd-test
        EOF
```

### Note:  

- **Add SSH Key to GitHub Secrets:**  
  1. Generate a key pair locally:  
     ```bash
     ssh-keygen -t ed25519 -C "your_email@example.com"
     ```  
  2. Add the private key (`~/.ssh/id_ed25519`) to GitHub Secrets as `SSH_KEY`.  
  3. Add the public key (`~/.ssh/id_ed25519.pub`) to the `~/.ssh/authorized_keys` file on your server.  


