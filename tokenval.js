const { Keypair, PublicKey } = require('@solana/web3.js');

// Función para crear un keypair desde un array de números (private key)
function createKeypairFromPrivateKey(privateKeyArray) {
    try {
        // Convertir array de números a Uint8Array
        const secretKey = new Uint8Array(privateKeyArray);
        
        // Crear keypair desde la secret key
        const keypair = Keypair.fromSecretKey(secretKey);
        
        return keypair;
    } catch (error) {
        throw new Error(`Error al crear keypair: ${error.message}`);
    }
}

// Función para validar y mostrar información del keypair
function validateKeypair(privateKeyInput) {
    try {
        console.log('🔍 Validando private key...\n');
        
        // Parsear el input (puede ser string o array)
        let privateKeyArray;
        
        if (typeof privateKeyInput === 'string') {
            // Si es string, intentar parsearlo como JSON
            try {
                privateKeyArray = JSON.parse(privateKeyInput);
            } catch {
                // Si no es JSON válido, intentar como array separado por comas
                privateKeyArray = privateKeyInput.split(',').map(num => parseInt(num.trim()));
            }
        } else if (Array.isArray(privateKeyInput)) {
            privateKeyArray = privateKeyInput;
        } else {
            throw new Error('Formato de private key no válido');
        }
        
        // Validar que sea un array de números
        if (!Array.isArray(privateKeyArray) || privateKeyArray.length !== 64) {
            throw new Error('La private key debe ser un array de 64 números');
        }
        
        // Validar que todos los elementos sean números
        if (!privateKeyArray.every(num => typeof num === 'number' && !isNaN(num))) {
            throw new Error('Todos los elementos deben ser números válidos');
        }
        
        // Crear keypair
        const keypair = createKeypairFromPrivateKey(privateKeyArray);
        
        // Obtener información
        const publicKey = keypair.publicKey.toBase58();
        const secretKey = Array.from(keypair.secretKey);
        
        console.log('✅ Keypair válido!');
        console.log(`📋 Public Key: ${publicKey}`);
        console.log(`🔑 Private Key (array): [${secretKey.join(',')}]`);
        console.log(`📏 Longitud de private key: ${secretKey.length} bytes`);
        
        // Verificar si termina en CWC
        if (publicKey.endsWith('CWC')) {
            console.log('🎉 ¡Esta public key termina en "CWC"!');
        } else {
            console.log('ℹ️  Esta public key NO termina en "CWC"');
        }
        
        return {
            publicKey,
            privateKey: secretKey,
            keypair
        };
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        return null;
    }
}

// Función para leer private key desde archivo keys.txt
function readPrivateKeyFromFile(keypairNumber = 1) {
    const fs = require('fs');
    const path = require('path');
    
    try {
        const filePath = path.join(__dirname, 'keys.txt');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Buscar el keypair específico
        const keypairRegex = new RegExp(`# Keypair ${keypairNumber}\\nPublic Key: .+\\nPrivate Key: \\[([^\\]]+)\\]`, 'g');
        const match = keypairRegex.exec(content);
        
        if (match) {
            const privateKeyString = match[1];
            const privateKeyArray = privateKeyString.split(',').map(num => parseInt(num.trim()));
            return privateKeyArray;
        } else {
            throw new Error(`No se encontró el keypair ${keypairNumber} en el archivo`);
        }
    } catch (error) {
        console.error('❌ Error leyendo archivo:', error.message);
        return null;
    }
}

// Función principal
function main() {
    console.log('🔐 Validador de Private Keys de Solana');
    console.log('=====================================\n');
    
    // Obtener argumentos de línea de comandos
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('📖 Uso del script:');
        console.log('  node tokenval.js [private_key_array]');
        console.log('  node tokenval.js --file [número_de_keypair]');
        console.log('\n📝 Ejemplos:');
        console.log('  node tokenval.js "[1,2,3,...,64]"');
        console.log('  node tokenval.js --file 1');
        console.log('\n💡 También puedes usar el formato:');
        console.log('  node tokenval.js "1,2,3,4,5,...,64"');
        return;
    }
    
    let privateKeyArray;
    
    if (args[0] === '--file') {
        // Leer desde archivo
        const keypairNumber = parseInt(args[1]) || 1;
        console.log(`📁 Leyendo keypair ${keypairNumber} desde keys.txt...`);
        privateKeyArray = readPrivateKeyFromFile(keypairNumber);
        
        if (!privateKeyArray) {
            return;
        }
    } else {
        // Usar private key proporcionada
        const privateKeyInput = args.join(' ');
        privateKeyArray = privateKeyInput;
    }
    
    // Validar keypair
    validateKeypair(privateKeyArray);
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    main();
}

module.exports = { validateKeypair, createKeypairFromPrivateKey, readPrivateKeyFromFile };
