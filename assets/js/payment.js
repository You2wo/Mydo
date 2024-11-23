document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.getElementById('payment-methods');
    const paymentForm = document.getElementById('payment-form');

    function updateTotalDisplay() {
        const totalPayment = localStorage.getItem('totalPayment');
        if (totalPayment) {
            const formattedTotal = (parseInt(totalPayment) / 100).toLocaleString('id-ID', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            
            const totalElements = document.querySelectorAll('.total-amount');
            totalElements.forEach(el => {
                el.textContent = `Rp ${formattedTotal}`;
            });
        }
    }

    function showPaymentForm(method) {
        let formHtml = '';
        switch(method) {
            case 'mastercard':
                formHtml = `
                    <div class="credit-card mb-4">
                        <div class="card-type">
                            <img src="assets/img/mastercard-logo.png" alt="Mastercard">
                        </div>
                        <div class="card-number">0000 0000 0000 0000</div>
                        <div class="card-info">
                            <span class="cardholder-name">John Doe</span>
                            <span class="expiry-date">00/00</span>
                        </div>
                    </div>
                    <h3>Mastercard Payment</h3>
                    <form>
                        <div class="mb-3">
                            <label for="cardNumber" class="form-label">Card Number</label>
                            <input type="text" class="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <label for="expiryDate" class="form-label">Expiry Date</label>
                                <input type="text" class="form-control" id="expiryDate" placeholder="MM/YY" readonly>
                            </div>
                            <div class="col">
                                <label for="cvv" class="form-label">CVV</label>
                                <input type="text" class="form-control" id="cvv" placeholder="123" maxlength="3">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="cardholderName" class="form-label">Cardholder Name</label>
                            <input type="text" class="form-control" id="cardholderName" placeholder="John Doe" maxlength="20">
                        </div>
                        <div class="total-amount">Rp 0,00</div>
                        <button type="submit" class="btn btn-primary">Bayar Sekarang</button>
                    </form>
                `;
                break;
            case 'qris':
                formHtml = `
                    <h3>QRIS Payment</h3>
                    <p>Scan the QR code below to complete your payment:</p>
                    <div id="qrcode"></div>
                    <p>Total Amount: <span class="total-amount">Rp 0,00</span></p>
                    <button type="submit" class="btn btn-primary">Bayar Sekarang</button>
                `;
                break;
            case 'shopeepay':
                formHtml = `
                    <div class="shopee-payment">
                        <div class="shopee-logo">
                            <img src="assets/img/ShopeePay-lgoowhite.png" alt="Shopee">
                        </div>
                        <div class="qr-code" id="shopeeQRCode"></div>
                        <div class="payment-info">
                            <p class="user-name">The Fields</p>
                            <p class="nmid">NMID: ESP17151395068</p>
                            <p class="tid">TID: A01</p>
                            <p class="transaction-id">Transaction ID: ESP17151395068</p>
                            <p class="total-payment">Total Payment: <span class="total-amount">Rp 0,00</span></p>
                        </div>
                        <button type="submit" class="btn btn-primary">Bayar Sekarang</button>
                    </div>
                `;
                break;
            case 'virtualaccount':
                formHtml = `
                <h3>BCA Virtual Account Payment</h3>
                <hr>
                <p>No. rek/Virtual Account Number:</p>
                <h4 id="virtualAccountNumber">1234 5678 9012 3456 <i class="fas fa-copy" id="copyIcon"></i></h4>
                <div id="copyNotification" class="copy-notification">Copied!</div>
                <hr>
                <div class="instruction-box">
                    <h5>Petunjuk Transfer mBanking</h5>
                    <ul>
                        <li>Pilih m-Transfer > BCA Virtual Account</li>
                        <li>Masukkan nomor Virtual Account 1234567890123456 dan pilih Send</li>
                        <li>Periksa informasi yang tertera di layar. Pastikan Total tagihan sudah benar dan username kamu valid</li>
                        <li>Masukkan PIN m-BCA Anda dan pilih OK</li>
                    </ul>
                </div>
                <p>Total Amount: <span class="total-amount">Rp 0,00</span></p>
                <button type="submit" class="btn btn-primary">Bayar Sekarang</button>
                `;
                break;
        }
        paymentForm.innerHTML = formHtml;
        

        if (method === 'qris') {
            const qrcodeElement = document.getElementById("qrcode");
            if (qrcodeElement) {
                qrcodeElement.innerHTML = '';
                
                new QRCode(qrcodeElement, {
                    text: "https://example.com/pay?amount=" + (localStorage.getItem('totalPayment') || "0"),
                    width: 200,
                    height: 200,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }
        }

        if (method === 'shopeepay') {
            const qrcodeElement = document.getElementById("shopeeQRCode");
            if (qrcodeElement) {
                qrcodeElement.innerHTML = '';
                new QRCode(qrcodeElement, {
                    text: "https://shopee.com/pay?amount=" + (localStorage.getItem('totalPayment') || "0"),
                    width: 200,
                    height: 200,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }
        }
        
        if (method === 'mastercard') {
            setupCreditCardDisplay();
        }

        if (method === 'virtualaccount') {
            const copyIcon = document.getElementById('copyIcon');
            const virtualAccountNumber = document.getElementById('virtualAccountNumber');
            const copyNotification = document.getElementById('copyNotification');
        
            if (copyIcon && virtualAccountNumber && copyNotification) {
                copyIcon.addEventListener('click', function() {
                    const accountNumber = virtualAccountNumber.textContent.trim().split(' ').slice(0, -1).join(' ');
                    
                    navigator.clipboard.writeText(accountNumber).then(() => {
                        copyNotification.classList.add('show');
                        setTimeout(() => {
                            copyNotification.classList.remove('show');
                        }, 2000);
                    }).catch(err => {
                        console.error('Gagal copy text: ', err);
                    });
                });
            }
        }

        updateTotalDisplay();
    }

    function setupCreditCardDisplay() {
        const cardNumber = document.getElementById('cardNumber');
        const cardholderName = document.getElementById('cardholderName');
        const expiryDate = document.getElementById('expiryDate');
    
        const displayCardNumber = document.querySelector('.card-number');
        const displayCardholderName = document.querySelector('.cardholder-name');
        const displayExpiryDate = document.querySelector('.expiry-date');
        
        flatpickr(expiryDate, {
            dateFormat: "m/y",
            disableMobile: true,
            static: true,
            position: "below",
            static: false,
            maxDate: new Date().fp_incr(3652,5),
            onClose: function(selectedDates, dateStr) {
                let formattedDate = dateStr.replace('/', '/20');
                displayExpiryDate.textContent = formattedDate;
            }
        });


        cardNumber.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
            this.value = formattedValue;

            let displayValue = value.padEnd(16, '0').replace(/(.{4})/g, '$1 ').trim();
            displayCardNumber.textContent = displayValue;
        });

        cardholderName.addEventListener('input', function() {
            let value = this.value.toUpperCase();
            if (value.length > 20) {
                value = value.slice(0, 20);
                this.value = value;
            }
            displayCardholderName.textContent = value || 'John Doe';
        });
        
        expiryDate.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            this.value = value;
            displayExpiryDate.textContent = value || '00/00';
        });
    }

    paymentMethods.addEventListener('click', function(e) {
        const option = e.target.closest('.payment-option');
        if (option) {
            document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
            option.classList.add('selected');
            
            const method = option.dataset.method;
            showPaymentForm(method);
        }
    });

    showPaymentForm('mastercard');

    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pembayaran berhasil');
        localStorage.removeItem('totalPayment');
    });

    updateTotalDisplay();
});