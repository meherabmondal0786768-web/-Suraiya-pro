‎let savedApiKey = "";
‎
‎function connectToServer() {
‎    const apiKey = document.getElementById('apiKey').value.trim();
‎    if (!apiKey) {
‎        alert('দয়া করে আপনার Gemini API Key দিন!');
‎        return;
‎    }
‎    savedApiKey = apiKey;
‎    document.getElementById('setupScreen').classList.add('hidden');
‎    document.getElementById('chatScreen').classList.remove('hidden');
‎}
‎
‎async function sendMessage() {
‎    const inputField = document.getElementById('userInput');
‎    const userText = inputField.value.trim();
‎    const chatContainer = document.getElementById('chatContainer');
‎
‎    if (!userText) return;
‎
‎    // ইউজারের মেসেজ স্ক্রিনে যোগ করা
‎    chatContainer.innerHTML += `<div class="msg user"><b>আপনি:</b> ${userText}</div>`;
‎    inputField.value = '';
‎    chatContainer.scrollTop = chatContainer.scrollHeight;
‎
‎    // লোডিং অ্যানিমেশন
‎    const loadingDiv = document.createElement('div');
‎    loadingDiv.className = 'msg ai';
‎    loadingDiv.innerHTML = '<b>সুরাইয়া:</b> ভাবছি...';
‎    chatContainer.appendChild(loadingDiv);
‎    chatContainer.scrollTop = chatContainer.scrollHeight;
‎
‎    try {
‎        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${savedApiKey}`, {
‎            method: 'POST',
‎            headers: { 'Content-Type': 'application/json' },
‎            body: JSON.stringify({
‎                contents: [{
‎                    parts: [{
‎                        text: `তুমি একজন বিশ্বস্ত, অত্যন্ত আন্তরিক এবং আপন সহকারী এআই সুরাইয়া। ব্যবহারকারীর দুঃখ, কষ্ট, আনন্দ কিংবা যেকোনো পরিস্থিতিতে একজন প্রকৃত বন্ধুর মতো অত্যন্ত সহানুভূতিশীল ও মিষ্টি ভাষায় বাংলায় উত্তর দেবে। ব্যবহারকারী যেন কখনো একা না বোধ করে, সেভাবে তার সব কথা মনোযোগ দিয়ে শুনবে এবং সহযোগিতা করবে। ব্যবহারকারীর বর্তমান কথা হলো: "${userText}"`
‎                    }]
‎                }]
‎            })
‎        });
‎
‎        const data = await response.json();
‎        if (data.candidates && data.candidates[0].content.parts[0].text) {
‎            loadingDiv.innerHTML = `<b>সুরাইয়া:</b> ${data.candidates[0].content.parts[0].text}`;
‎        } else {
‎            loadingDiv.innerHTML = '<b>সুরাইয়া:</b> একটু সমস্যা হচ্ছে ভাইয়া, এপিআই কি-টি ঠিক আছে তো?';
‎        }
‎    } catch (error) {
‎        loadingDiv.innerHTML = '<b>সুরাইয়া:</b> নেটওয়ার্কের কারণে যোগাযোগ করতে পারছি না।';
‎    }
‎    chatContainer.scrollTop = chatContainer.scrollHeight;
‎}
‎
‎document.getElementById('micBtn').addEventListener('click', () => {
‎    alert('মাইক ফিচারটি অ্যাপে সংযুক্ত করার কাজ চলছে।');
‎});
‎