#!/usr/bin/env node

import ngrok from 'ngrok';
import { spawn } from 'child_process';

const port = 5678;

export async function createTunnel(port) {
  try {
    console.log(`Creating ngrok tunnel for localhost:${port}...`);
    
    const url = await ngrok.connect(port);
    
    console.log(`✅ Tunnel created successfully!`);
    console.log(`🌐 Public URL: ${url}`);
    console.log(`🔗 Local URL: http://localhost:${port}`);
    
    return url;
  } catch (error) {
    console.error('❌ Failed to create ngrok tunnel:', error.message);
    throw error;
  }
}

export async function closeTunnel(url) {
  try {
    if (url) {
      await ngrok.disconnect(url);
      console.log(`🔒 Tunnel ${url} closed`);
    } else {
      await ngrok.disconnect();
      console.log('🔒 All tunnels closed');
    }
  } catch (error) {
    console.error('❌ Error closing tunnel:', error.message);
    throw error;
  }
}


export async function killAllTunnels() {
  try {
    await ngrok.kill();
    console.log('💀 All ngrok processes killed');
  } catch (error) {
    console.error('❌ Error killing ngrok processes:', error.message);
    throw error;
  }
}

export async function startTunnel(port) {
  try {
    const tunnelUrl = await createTunnel(port);
    
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down...');
      await killAllTunnels();
      process.exit(0);
    });

    return tunnelUrl;
  } catch (error) {
    console.error('Failed to start tunnel:', error);
    process.exit(1);
  }
}

const ngrok_url = await startTunnel(port);




const n8nProcess = spawn('n8n', ['start'], {
  stdio: 'inherit',
  shell: true, 
  env: {
    "WEBHOOK_URL":ngrok_url,
    "N8N_WEBHOOK_URL":ngrok_url,
    'N8N_RUNNERS_ENABLED':'true' 
  }
});

n8nProcess.on('close', (code) => {
  console.log(`n8n exited with code ${code}`);
});