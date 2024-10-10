// Check if Metamask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('Metamask is installed');
} else {
    alert('Please install Metamask to proceed.');
}

// Function to connect wallet and process payment
async function payWithMetamask(priceInEth, toolName) {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const priceInWei = ethers.utils.parseEther(priceInEth);
        const transactionParameters = {
            to: '0x2727975E8C02360B36c85b127EA5Cf45291e183d',
            from: account,
            value: priceInWei.toHexString(),
            chainId: '0x14A34', //0x64 for mainnet
        };

        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        console.log(`Transaction hash: ${txHash}`);
        alert(`Payment successful! You have ordered the ${toolName}.`);

        // Show the form to collect additional details
        document.getElementById('payment-form').style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Transaction failed. Please try again.');
    }
}

// Form submission handler
document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const collection = document.getElementById('collection').value;

    console.log(`Email: ${email}, Collection: ${collection}`);
    
    // Send email notification (with EmailJS for example)
    sendEmailNotification(email, collection);
});


function sendEmailNotification(email, collectionName, collectionLink, collectionLogo, tool, amount, transactionId) {
    const templateParams = {
        user_email: email,
        collection_name: collectionName,
        collection_link: collectionLink,
        collection_logo: collectionLogo,
        tool: tool,
        amount: amount,
        transaction_id: transactionId
    };

    emailjs.send('service_op7gmfw', 'template_yu66ga3', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            alert('Thank you! Your order is complete and we will contact you soon.');
        }, function(error) {
            console.error('Failed to send email:', error);
            alert('Sorry, something went wrong. Please contact support.');
        });
}




// Add event listeners to order buttons
document.querySelectorAll('.cta').forEach(button => {
    button.addEventListener('click', function() {
        const price = this.getAttribute('data-price');
        const tool = this.getAttribute('data-tool');
        payWithMetamask(price, tool);
    });
});

document.querySelectorAll('.toggle-requirements').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});

