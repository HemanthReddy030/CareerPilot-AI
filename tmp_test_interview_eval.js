const fetch = globalThis.fetch || require('node-fetch');

(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/interview/evaluate-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: 'Tell me about a time you solved a hard problem',
        answer: 'I worked with a team and resolved it by debugging and iterating quickly.',
      }),
    });

    const text = await response.text();
    console.log('STATUS', response.status);
    console.log('TEXT', text);
  } catch (err) {
    console.error('ERROR', err);
  }
})();
