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
            chainId: '0x14a34', // Use appropriate chain ID for your network
        };

        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        console.log(`Transaction hash: ${txHash}`);
        alert(`Payment successful! You have ordered the ${toolName}.`);

        // Show the form to collect additional details
        document.getElementById('payment-form').style.display = 'block';

        // Set tool name in form
        document.getElementById('toolName').value = toolName;
        document.getElementById('transactionId').value = txHash; // Set transaction ID

    } catch (error) {
        console.error(error);
        alert('Transaction failed. Please try again.');
    }
}

// Form submission handler (for "Submit Details" button)
document.querySelector('.submit-details').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('userEmail').value;
    const collectionName = document.getElementById('collectionName').value;
    const collectionLink = document.getElementById('collectionLink').value;
    const collectionLogo = document.getElementById('collectionLogo').value;
    const amount = document.getElementById('transactionAmount').value;
    const transactionId = document.getElementById('transactionId').value;
    const toolName = document.getElementById('toolName').value;

    console.log(`Email: ${email}, Collection Name: ${collectionName}, Amount: ${amount}, Transaction ID: ${transactionId}`);

    // Ensure all fields are filled
    if (!email || !collectionName || !amount || !transactionId) {
        alert("Please fill in all required fields.");
        return;
    }

    // Send email notification
    sendEmailNotification(email, collectionName, collectionLink, collectionLogo, toolName, amount, transactionId);
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
document.querySelectorAll('.cta-order').forEach(button => {
    button.addEventListener('click', function() {
        const price = this.getAttribute('data-price');
        const tool = this.getAttribute('data-tool');
        payWithMetamask(price, tool);
    });
});

// Toggle additional requirements
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
