// Breakdown of trip expenses and final split

const expenses = [
  { amount: 230, paidFor: 'Train Ticket 🚆' },
  { amount: 300, paidFor: 'Auto 🚗' },
  { amount: 300, paidFor: 'Petrol ⛽' },
  { amount: 10, paidFor: 'Bike hawa 🏍️' },
  { amount: 50, paidFor: 'Pohe 🍽️' },
  { amount: 20, paidFor: 'Tea ☕' },
  { amount: 20, paidFor: 'Water Bottle 🥤' },
  { amount: 10, paidFor: 'Laddu 🍬' },
  { amount: 10, paidFor: 'Tea ☕' },
  { amount: 40, paidFor: 'Lemon Sharbat 🍋' },
  { amount: 30, paidFor: 'Drinks (Thumbs Up ₹20 for Satish + Chaas ₹10 for me) 🥤' },
  { amount: 15, paidFor: 'Vada Pav 🍔 (Satish Personal)' },
  { amount: 40, paidFor: 'Sugarcane Juice 🍹' },
  { amount: 20, paidFor: 'Cucumber 🥒' },
  { amount: 50, paidFor: 'Coconut Water 🥥' },
  { amount: 90, paidFor: 'Food (Dalcha Rice ₹60 + Bhaji ₹30) 🍛' },
  { amount: 40, paidFor: 'Irani Tea (Aundh) 🍵' },
  { amount: 60, paidFor: 'Cash payment 💵' }
];

// Total amount spent by me
const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0); // ₹1335

// Personal expenses (not shared)
const personalExpenses = [
  { amount: 20, paidFor: 'Thumbs Up 🍻 (Satish\'s Personal)' },
  { amount: 10, paidFor: 'Chaas 🥛 (My Personal)' },
  { amount: 15, paidFor: 'Vada Pav 🍔 (Satish\'s Personal)' }
];

const personalTotal = personalExpenses.reduce((total, expense) => total + expense.amount, 0); // ₹45

// Shared expenses (remaining after removing personal expenses)
const sharedTotal = totalSpent - personalTotal; // ₹1290
const eachShare = sharedTotal / 2; // ₹645

// Final calculations for each person's share
const finalAmounts = {
  satish: eachShare + 20 + 15, // ₹680 (Thumbs Up + Vada Pav)
  me: eachShare + 10 // ₹655 (Chaas)
};

// Message to Satish
const message = `
Hey Satish,

Here’s the updated detailed breakdown of our Tung Fort, Pune trip expenses:

Expenses Paid by Me:
${expenses.map(expense => `- ₹${expense.amount} for ${expense.paidFor}`).join('\n')}

Total Spent: ₹${totalSpent} 💰

Decisions:
- All payments were done by me (online + ₹60 cash).
- We agreed to split the common expenses equally after the trip.
- Personal items (not shared):
  - Thumbs Up (₹20) → Your personal.
  - Vada Pav (₹15) → Your personal.
  - Chaas (₹10) → My personal.

Personal Expenses:
${personalExpenses.map(expense => `- ₹${expense.amount} for ${expense.paidFor}`).join('\n')}

Total Personal Expenses: ₹${personalTotal}

Amount to Split: ₹${sharedTotal}
Each person’s share of common expenses: ₹${eachShare} 🤝

Final Calculation:
- Your final amount = ₹${finalAmounts.satish} 💸
- My final amount = ₹${finalAmounts.me} 💸

Please send ₹${finalAmounts.satish} whenever you’re ready. No hurry! ⏳

Thanks a lot, bro! It was a fun trip! Tung Fort memories are awesome! 📸
`;

// Send message
console.log(message);