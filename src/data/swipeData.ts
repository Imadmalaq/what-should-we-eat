import { SwipeQuestion, FoodRecommendation } from '@/types/app';

const questionBank: SwipeQuestion[] = [
  {
    id: 'q1',
    question: "What's your current mood?",
    emoji: "😊",
    optionA: { text: "Comfort and cozy", emoji: "😌", category: "comfort" },
    optionB: { text: "Adventure and excitement", emoji: "🚀", category: "adventurous" }
  },
  {
    id: 'q2',
    question: "How hungry are you?",
    emoji: "🍽️",
    optionA: { text: "Light appetite", emoji: "🥗", category: "light" },
    optionB: { text: "Really hungry", emoji: "🍖", category: "hearty" }
  },
  {
    id: 'q3',
    question: "What's your spice tolerance?",
    emoji: "🌶️",
    optionA: { text: "Mild and gentle", emoji: "😌", category: "mild" },
    optionB: { text: "Bring the heat!", emoji: "🔥", category: "spicy" }
  },
  {
    id: 'q4',
    question: "Preferred cuisine style?",
    emoji: "🌍",
    optionA: { text: "Familiar favorites", emoji: "🏠", category: "familiar" },
    optionB: { text: "International flavors", emoji: "✈️", category: "international" }
  },
  {
    id: 'q5',
    question: "How much time do you have?",
    emoji: "⏰",
    optionA: { text: "Quick and easy", emoji: "⚡", category: "quick" },
    optionB: { text: "Take our time", emoji: "🍷", category: "leisurely" }
  },
  {
    id: 'q6',
    question: "What's your budget like?",
    emoji: "💰",
    optionA: { text: "Budget-friendly", emoji: "💵", category: "budget" },
    optionB: { text: "Treat ourselves", emoji: "💎", category: "splurge" }
  },
  {
    id: 'q7',
    question: "Protein preference?",
    emoji: "🥩",
    optionA: { text: "Plant-based", emoji: "🌱", category: "vegetarian" },
    optionB: { text: "Meat lovers", emoji: "🥩", category: "meat" }
  },
  {
    id: 'q8',
    question: "Dining style preference?",
    emoji: "🍽️",
    optionA: { text: "Share everything", emoji: "💕", category: "sharing" },
    optionB: { text: "Individual plates", emoji: "🍽️", category: "individual" }
  },
  {
    id: 'q9',
    question: "Temperature preference?",
    emoji: "🌡️",
    optionA: { text: "Hot and warm", emoji: "☕", category: "hot" },
    optionB: { text: "Cool and fresh", emoji: "🧊", category: "cold" }
  },
  {
    id: 'q10',
    question: "What's your energy level?",
    emoji: "⚡",
    optionA: { text: "Low energy, simple", emoji: "😴", category: "easy" },
    optionB: { text: "High energy, special", emoji: "🎉", category: "special" }
  },
  {
    id: 'q11',
    question: "Texture preference?",
    emoji: "👅",
    optionA: { text: "Smooth and creamy", emoji: "🥛", category: "creamy" },
    optionB: { text: "Crispy and crunchy", emoji: "🥖", category: "crunchy" }
  },
  {
    id: 'q12',
    question: "Health consciousness?",
    emoji: "🥗",
    optionA: { text: "Indulge tonight", emoji: "🍰", category: "indulgent" },
    optionB: { text: "Keep it healthy", emoji: "🥑", category: "healthy" }
  },
  {
    id: 'q13',
    question: "Social dining preference?",
    emoji: "👥",
    optionA: { text: "Intimate for two", emoji: "💑", category: "intimate" },
    optionB: { text: "Lively atmosphere", emoji: "🎊", category: "social" }
  },
  {
    id: 'q14',
    question: "Cultural exploration?",
    emoji: "🗺️",
    optionA: { text: "Stay local", emoji: "🏡", category: "local" },
    optionB: { text: "Try global cuisine", emoji: "🌐", category: "global" }
  },
  {
    id: 'q15',
    question: "Meal complexity?",
    emoji: "👨‍🍳",
    optionA: { text: "Simple preparation", emoji: "🍞", category: "simple" },
    optionB: { text: "Gourmet experience", emoji: "🍾", category: "gourmet" }
  }
];

// Function to get random questions for each session
function getRandomQuestions(): SwipeQuestion[] {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

export const swipeQuestions = getRandomQuestions();

export const foodRecommendations: { [key: string]: FoodRecommendation } = {
  pasta: {
    type: 'pasta',
    title: 'Cozy Pasta Night! 🍝',
    description: 'Perfect for a romantic evening with something warm and comforting.',
    emoji: '🍝',
    suggestions: ['Romantic dinner', 'Comfort food cravings', 'Sharing a meal']
  },
  sushi: {
    type: 'sushi',
    title: 'Fresh Sushi Date! 🍣',
    description: 'Light, fresh, and perfect for sharing together.',
    emoji: '🍣',
    suggestions: ['Light dinner', 'Fresh flavors', 'Special occasion']
  },
  pizza: {
    type: 'pizza',
    title: 'Pizza Party! 🍕',
    description: 'Easy, shareable, and always a crowd-pleaser.',
    emoji: '🍕',
    suggestions: ['Casual dinner', 'Sharing food', 'Comfort cravings']
  },
  thai: {
    type: 'thai',
    title: 'Spicy Thai Adventure! 🌶️',
    description: 'Bold flavors and aromatic spices to awaken your senses.',
    emoji: '🌶️',
    suggestions: ['Spicy food', 'Fresh flavors', 'Adventure dining']
  },
  indian: {
    type: 'indian',
    title: 'Indian Feast! 🍛',
    description: 'Rich, flavorful curries and warm naan bread.',
    emoji: '🍛',
    suggestions: ['Rich flavors', 'Warming spices', 'Hearty meal']
  },
  mexican: {
    type: 'mexican',
    title: 'Mexican Fiesta! 🌮',
    description: 'Vibrant flavors and fresh ingredients for a festive meal.',
    emoji: '🌮',
    suggestions: ['Festive mood', 'Fresh ingredients', 'Spicy kick']
  },
  chinese: {
    type: 'chinese',
    title: 'Chinese Takeout! 🥡',
    description: 'Comfort food with a variety of flavors and textures.',
    emoji: '🥡',
    suggestions: ['Comfort food', 'Variety', 'Quick dining']
  },
  korean: {
    type: 'korean',
    title: 'Korean BBQ Night! 🥩',
    description: 'Interactive dining with grilled meats and kimchi.',
    emoji: '🥩',
    suggestions: ['Interactive dining', 'Grilled food', 'Bold flavors']
  },
  vietnamese: {
    type: 'vietnamese',
    title: 'Vietnamese Pho! 🍜',
    description: 'Light, flavorful broth with fresh herbs and noodles.',
    emoji: '🍜',
    suggestions: ['Light meal', 'Fresh herbs', 'Comforting broth']
  },
  poke: {
    type: 'poke',
    title: 'Fresh Poke Bowl! 🐟',
    description: 'Healthy, customizable bowls with fresh fish and vegetables.',
    emoji: '🐟',
    suggestions: ['Healthy choice', 'Fresh ingredients', 'Customizable']
  },
  mediterranean: {
    type: 'mediterranean',
    title: 'Mediterranean Mezze! 🫒',
    description: 'Fresh, healthy options with olive oil and herbs.',
    emoji: '🫒',
    suggestions: ['Healthy dining', 'Fresh flavors', 'Light meal']
  },
  ramen: {
    type: 'ramen',
    title: 'Cozy Ramen Night! 🍲',
    description: 'Warm, comforting noodle soup perfect for any weather.',
    emoji: '🍲',
    suggestions: ['Comfort food', 'Warming meal', 'Cozy night']
  },
  burgers: {
    type: 'burgers',
    title: 'Classic Burger Night! 🍔',
    description: 'Juicy, satisfying burgers with all the fixings.',
    emoji: '🍔',
    suggestions: ['Classic comfort', 'Satisfying meal', 'Casual dining']
  },
  tacos: {
    type: 'tacos',
    title: 'Taco Tuesday! 🌮',
    description: 'Fun, handheld food perfect for sharing and variety.',
    emoji: '🌮',
    suggestions: ['Fun dining', 'Variety', 'Handheld food']
  },
  greek: {
    type: 'greek',
    title: 'Greek Gyros! 🥙',
    description: 'Fresh Mediterranean flavors with tzatziki and pita.',
    emoji: '🥙',
    suggestions: ['Mediterranean', 'Fresh flavors', 'Healthy option']
  },
  italian: {
    type: 'italian',
    title: 'Italian Classics! 🇮🇹',
    description: 'Traditional Italian comfort food with rich flavors.',
    emoji: '🇮🇹',
    suggestions: ['Classic comfort', 'Rich flavors', 'Traditional']
  },
  turkish: {
    type: 'turkish',
    title: 'Turkish Delights! 🥘',
    description: 'Exotic flavors and aromatic spices from the Middle East.',
    emoji: '🥘',
    suggestions: ['Exotic flavors', 'Aromatic spices', 'Cultural cuisine']
  },
  surprise: {
    type: 'surprise',
    title: 'Surprise Me! 🎉',
    description: 'Something unexpected and delightful awaits!',
    emoji: '🎉',
    suggestions: ['Adventure', 'Unexpected', 'Try something new']
  }
};