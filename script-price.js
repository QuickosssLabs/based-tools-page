// Form submission handler (for "Submit Details" button)
document.querySelector('.submit-details').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const collectionName = document.getElementById('collectionName').value;
    const collectionLink = document.getElementById('collectionLink').value;
    const collectionLogo = document.getElementById('collectionLogo').value;
    const paymentAddress = document.getElementById('paymentAddress').value;
    const toolName = document.getElementById('toolName').value;

    console.log(`Name: ${name}, Email: ${email}, Collection Name: ${collectionName}, Tool Name: ${toolName}`);

    // Ensure all required fields are filled
    if (!name || !collectionName || !collectionLink || !paymentAddress) {
        alert("Please fill in all required fields.");
        return;
    }

    // Send email notification
    sendEmailNotification(name, email, collectionName, collectionLink, collectionLogo, toolName, paymentAddress);
});


function sendEmailNotification(name, email, collectionName, collectionLink, collectionLogo, tool, paymentAddress) {
    const templateParams = {
        user_name: name,
        user_email: email,
        collection_name: collectionName,
        collection_link: collectionLink,
        collection_logo: collectionLogo,
        tool: tool,
        address: paymentAddress
    };

    emailjs.send('service_op7gmfw', 'template_yu66ga3', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            alert('Thank you! Your order is complete and we will contact you soon.');
                    // Close the modal after the form is submitted successfully
                    document.getElementById('payment-modal').style.display = 'none';
        
        }, function(error) {
            console.error('Failed to send email:', error);
            alert('Sorry, something went wrong. Please contact support.');
        });
}

// Add event listeners to order buttons
document.querySelectorAll('.cta-order').forEach(button => {
    button.addEventListener('click', function() {
        // Show the modal
        document.getElementById('payment-modal').style.display = 'block';

        // Set tool name and price in form
        const toolName = this.getAttribute('data-tool');

        // Si vous souhaitez afficher le prix dans le formulaire, sinon vous pouvez l'ignorer
        document.getElementById('toolName').value = toolName;
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

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("promoPopup");
    const closeBtn = document.querySelector(".close-btn");
    const claimOfferBtn = document.getElementById("claimOffer");
  
    popup.style.display = "block";
  
    closeBtn.addEventListener("click", function() {
      popup.style.display = "none";
    });
  
    claimOfferBtn.addEventListener("click", function() {
      popup.style.display = "none";
    });
  
    window.addEventListener("click", function(event) {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    });
  });
