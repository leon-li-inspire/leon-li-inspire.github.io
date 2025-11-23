document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('typewriter-text');
    if (!element) return;

    const initialText = element.getAttribute('data-text') || element.innerText;
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const fixedSentences = [
        initialText,
        `Today is ${today}`
    ];

    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Life is what happens when you're busy making other plans. - John Lennon",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
        "The purpose of our lives is to be happy. - Dalai Lama",
        "Get busy living or get busy dying. - Stephen King",
        "You only live once, but if you do it right, once is enough. - Mae West",
        "Many of life's failures are people who did not realize how close they were to success when they gave up. - Thomas A. Edison",
        "If you want to live a happy life, tie it to a goal, not to people or things. - Albert Einstein",
        "Never let the fear of striking out keep you from playing the game. - Babe Ruth",
        "Money and success don’t change people; they merely amplify what is already there. - Will Smith",
        "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
        "Not how long, but how well you have lived is the main thing. - Seneca",
        "If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt",
        "The whole secret of a successful life is to find out what is one’s destiny to do, and then do it. - Henry Ford",
        "In order to write about life first you must live it. - Ernest Hemingway",
        "The big lesson in life, baby, is never be scared of anyone or anything. - Frank Sinatra",
        "Sing like no one’s listening, love like you’ve never been hurt, dance like nobody’s watching, and live like it’s heaven on earth. - (Attributed to various sources)",
        "Curiosity about life in all of its aspects, I think, is still the secret of great creative people. - Leo Burnett",
        "Life is not a problem to be solved, but a reality to be experienced. - Soren Kierkegaard",
        "The unexamined life is not worth living. - Socrates",
        "Turn your wounds into wisdom. - Oprah Winfrey",
        "The way I see it, if you want the rainbow, you gotta put up with the rain. - Dolly Parton",
        "Do all the good you can, for all the people you can, in all the ways you can, as long as you can. - Hillary Clinton",
        "Don’t settle for what life gives you; make life better and build something. - Ashton Kutcher",
        "Everything negative – pressure, challenges – is all an opportunity for me to rise. - Kobe Bryant",
        "I like criticism. It makes you strong. - LeBron James",
        "You never really learn much from hearing yourself speak. - George Clooney",
        "Life imposes things on you that you can’t control, but you still have the choice of how you’re going to live through this. - Celine Dion",
        "Life is never easy. There is work to be done and obligations to be met – obligations to truth, to justice, and to liberty. - John F. Kennedy",
        "Live for each second without hesitation. - Elton John",
        "Life is like riding a bicycle. To keep your balance, you must keep moving. - Albert Einstein",
        "Life is really simple, but we insist on making it complicated. - Confucius",
        "Life is a succession of lessons which must be lived to be understood. - Ralph Waldo Emerson",
        "My mama always said, life is like a box of chocolates. You never know what you're gonna get. - Forrest Gump",
        "Watch your thoughts; they become words. Watch your words; they become actions. Watch your actions; they become habits. Watch your habits; they become character. Watch your character; it becomes your destiny. - Lao-Tzu",
        "When we do the best we can, we never know what miracle is wrought in our life or the life of another. - Helen Keller",
        "The healthiest response to life is joy. - Deepak Chopra",
        "Life is like a coin. You can spend it any way you wish, but you only spend it once. - Lillian Dickson",
        "The best portion of a good man's life is his little, nameless, unremembered acts of kindness and of love. - Wordsworth",
        "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
        "Life is ten percent what happens to you and ninety percent how you respond to it. - Charles Swindoll",
        "Keep calm and carry on. - Winston Churchill",
        "Maybe that’s what life is… a wink of the eye and winking stars. - Jack Kerouac",
        "Life is a flower of which love is the honey. - Victor Hugo",
        "Keep smiling, because life is a beautiful thing and there's so much to smile about. - Marilyn Monroe",
        "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship. - Buddha",
        "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. - Dr. Seuss",
        "Good friends, good books, and a sleepy conscience: this is the ideal life. - Mark Twain",
        "Life would be tragic if it weren't funny. - Stephen Hawking",
        "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi",
        "That which does not kill us makes us stronger. - Friedrich Nietzsche",
        "Be yourself; everyone else is already taken. - Oscar Wilde",
        "Strive not to be a success, but rather to be of value. - Albert Einstein",
        "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference. - Robert Frost",
        "I have not failed. I've just found 10,000 ways that won't work. - Thomas A. Edison",
        "A journey of a thousand miles begins with a single step. - Lao Tzu",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
        "The best way to predict the future is to invent it. - Alan Kay",
        "If you tell the truth, you don't have to remember anything. - Mark Twain",
        "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel. - Maya Angelou",
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. - Ralph Waldo Emerson",
        "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that. - Martin Luther King Jr.",
        "Our greatest glory is not in never falling, but in rising every time we fall. - Confucius",
        "It is never too late to be what you might have been. - George Eliot",
        "To live is the rarest thing in the world. Most people exist, that is all. - Oscar Wilde",
        "Pain is inevitable. Suffering is optional. - Haruki Murakami",
        "All our dreams can come true, if we have the courage to pursue them. - Walt Disney",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "Everything you’ve ever wanted is on the other side of fear. - George Addair",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
        "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "Act as if what you do makes a difference. It does. - William James",
        "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "The secret of getting ahead is getting started. - Mark Twain",
        "Quality is not an act, it is a habit. - Aristotle",
        "It always seems impossible until it's done. - Nelson Mandela",
        "With the new day comes new strength and new thoughts. - Eleanor Roosevelt",
        "Failure will never overtake me if my determination to succeed is strong enough. - Og Mandino",
        "It is during our darkest moments that we must focus to see the light. - Aristotle",
        "Don't judge each day by the harvest you reap but by the seeds that you plant. - Robert Louis Stevenson",
        "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart. - Helen Keller",
        "Do not go where the path may lead, go instead where there is no path and leave a trail. - Ralph Waldo Emerson",
        "You must be the change you wish to see in the world. - Mahatma Gandhi",
        "Spread love everywhere you go. Let no one ever come to you without leaving happier. - Mother Teresa",
        "The only thing we have to fear is fear itself. - Franklin D. Roosevelt",
        "Do one thing every day that scares you. - Eleanor Roosevelt",
        "Well done is better than well said. - Benjamin Franklin",
        "The best revenge is massive success. - Frank Sinatra",
        "People who are crazy enough to think they can change the world, are the ones who do. - Rob Siltanen",
        "Optimism is the one quality more associated with success and happiness than any other. - Brian Tracy",
        "Happiness is not something ready made. It comes from your own actions. - Dalai Lama",
        "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you. - Steve Jobs",
        "Experience is a hard teacher because she gives the test first, the lesson afterwards. - Vernon Sanders Law",
        "To know how much there is to know is the beginning of learning to live. - Dorothy West",
        "Goal setting is the secret to a compelling future. - Tony Robbins"
    ];

    element.innerText = ''; // Clear initial text
    element.style.opacity = 1; // Make visible

    // Create text node and cursor
    const textNode = document.createTextNode('');
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.innerText = '|';
    cursor.style.animation = 'blink 1s step-end infinite';

    element.appendChild(textNode);
    element.appendChild(cursor);

    // Add cursor styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .typewriter-cursor {
            display: inline-block;
            margin-left: 2px;
            color: orange;
            font-weight: bold;
            vertical-align: bottom;
        }
        @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    let sentenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 50; // Faster typing
    const deleteSpeed = 30; // Faster deleting
    const pauseTime = 1500; // Shorter pause
    let currentText = fixedSentences[0];

    function type() {
        if (isDeleting) {
            textNode.nodeValue = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textNode.nodeValue = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            nextSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            sentenceIndex++;

            if (sentenceIndex < fixedSentences.length) {
                currentText = fixedSentences[sentenceIndex];
            } else {
                currentText = quotes[Math.floor(Math.random() * quotes.length)];
            }

            nextSpeed = 500; // Pause before typing next sentence
        }

        setTimeout(type, nextSpeed);
    }

    // Start typing
    setTimeout(type, 500);
});
