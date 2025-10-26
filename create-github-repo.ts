import { createGitHubRepository, getUserInfo } from './server/github';

async function main() {
  try {
    console.log('🔐 Authenticating with GitHub...');
    const user = await getUserInfo();
    console.log(`✅ Authenticated as: ${user.login}`);
    console.log(`📧 Email: ${user.email || 'Not public'}`);
    
    console.log('\n📦 Creating new repository...');
    const repo = await createGitHubRepository(
      'destinova',
      'Destinova - AI Career & Education Decision Simulation Platform for Indonesian users. Built by PT. Sentra Karya Integrasi Global.',
      false // Set to true for private repo
    );
    
    console.log('\n✅ Repository created successfully!');
    console.log(`📍 Repository URL: ${repo.html_url}`);
    console.log(`🔗 Clone URL: ${repo.clone_url}`);
    console.log(`📝 SSH URL: ${repo.ssh_url}`);
    
    console.log('\n📋 Next steps:');
    console.log('1. Add remote: git remote add origin ' + repo.ssh_url);
    console.log('2. Add files: git add .');
    console.log('3. Commit: git commit -m "Initial commit: Destinova platform"');
    console.log('4. Push: git push -u origin main');
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
