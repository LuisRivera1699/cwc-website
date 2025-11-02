const { Keypair } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

// Función para generar keypairs hasta encontrar uno que termine en "CWC"
async function generateKeypairWithSuffix() {
    let attempts = 0;
    const maxAttempts = 1000000; // Límite de intentos para evitar bucles infinitos
    
    while (attempts < maxAttempts) {
        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        
        // Verificar si la public key termina en "CWC"
        if (publicKey.endsWith('CWC')) {
            return {
                publicKey: publicKey,
                privateKey: Array.from(keypair.secretKey)
            };
        }
        
        attempts++;
        
        // Mostrar progreso cada 10000 intentos
        if (attempts % 10000 === 0) {
            console.log(`Intentos realizados: ${attempts}`);
        }
    }
    
    throw new Error(`No se encontró un keypair válido después de ${maxAttempts} intentos`);
}

// Función principal
async function main() {
    console.log('🚀 Iniciando generación de keypairs que terminen en "CWC"...');
    console.log('📝 Se generarán hasta 20 keypairs válidos');
    console.log('⏳ Esto puede tomar varios minutos...\n');
    
    const validKeypairs = [];
    const targetCount = 20;
    
    try {
        for (let i = 1; i <= targetCount; i++) {
            console.log(`🔍 Generando keypair ${i}/${targetCount}...`);
            
            const keypair = await generateKeypairWithSuffix();
            validKeypairs.push(keypair);
            
            console.log(`✅ Keypair ${i} encontrado: ${keypair.publicKey}`);
        }
        
        // Crear contenido del archivo
        let fileContent = `# Keypairs generados que terminan en "CWC"\n`;
        fileContent += `# Generado el: ${new Date().toISOString()}\n`;
        fileContent += `# Total de keypairs: ${validKeypairs.length}\n\n`;
        
        validKeypairs.forEach((keypair, index) => {
            fileContent += `# Keypair ${index + 1}\n`;
            fileContent += `Public Key: ${keypair.publicKey}\n`;
            fileContent += `Private Key: [${keypair.privateKey.join(',')}]\n\n`;
        });
        
        // Escribir archivo
        const filePath = path.join(__dirname, 'keys.txt');
        fs.writeFileSync(filePath, fileContent);
        
        console.log(`\n🎉 ¡Completado! Se generaron ${validKeypairs.length} keypairs válidos`);
        console.log(`📄 Los resultados se guardaron en: ${filePath}`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Ejecutar el script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { generateKeypairWithSuffix };
