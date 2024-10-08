export const emotions = {
  easy: [
    { name: 'Happy', thoughts: ['I feel great!', 'Everything is wonderful'], behaviors: ['Smiling', 'Laughing'], sensations: ['Warm feeling in chest', 'Relaxed muscles'] },
    { name: 'Happy', thoughts: ['This moment is perfect', 'I love being here'], behaviors: ['Engaging in social activities', 'Speaking with an upbeat tone'], sensations: ['Lightness in body', 'Energetic movements'] },

    { name: 'Sad', thoughts: ['Nothing goes right', 'I feel hopeless'], behaviors: ['Crying', 'Withdrawing'], sensations: ['Heaviness in chest', 'Fatigue'] },
    { name: 'Sad', thoughts: ['Why does this always happen to me?', 'Life feels unfair'], behaviors: ['Avoiding others', 'Seeking comfort from friends or family'], sensations: ['Tightness in throat', 'Low energy and sluggishness'] },

    { name: 'Scared', thoughts: ['Something bad is going to happen', 'I can\'t escape this'], behaviors: ['Hiding', 'Avoiding the situation'], sensations: ['Quickened heart rate', 'Cold sweats'] },
    { name: 'Scared', thoughts: ['What if things go wrong?', 'I don’t feel safe'], behaviors: ['Fidgeting', 'Avoiding eye contact'], sensations: ['Tightness in chest', 'Shaky hands'] },

    { name: 'Mad', thoughts: ['This isn\'t fair', 'I’m frustrated'], behaviors: ['Yelling', 'Frowning'], sensations: ['Tense muscles', 'Clenched fists'] },
    { name: 'Mad', thoughts: ['Why won’t things go my way?', 'This situation is out of control'], behaviors: ['Raising voice', 'Clenching fists'], sensations: ['Heat in the face', 'Fast heartbeat'] }
  ],
  
  medium: [
    { name: 'Excited', thoughts: ['I can\'t wait!', 'This is going to be amazing'], behaviors: ['Talking fast', 'Fidgeting'], sensations: ['Butterflies in stomach', 'Increased heart rate'] },
    { name: 'Excited', thoughts: ['I feel thrilled about this', 'This is such an adventure'], behaviors: ['Pacing', 'Clapping hands or jumping'], sensations: ['Jittery energy', 'Tingling in the limbs'] },

    { name: 'Cheerful', thoughts: ['This is fun!', 'Life is good right now'], behaviors: ['Playful gestures', 'Making jokes'], sensations: ['Tingling in the body', 'Relaxed energy'] },
    { name: 'Cheerful', thoughts: ['I\'m in a great mood!', 'This day is amazing!'], behaviors: ['Laughing', 'Energetic movements'], sensations: ['Lightness in body', 'Warmth in chest'] },

    { name: 'Lonely', thoughts: ['I\'m all alone', 'No one cares about me'], behaviors: ['Isolating oneself', 'Avoiding social interactions'], sensations: ['Heaviness in the chest', 'Low energy'] },
    { name: 'Lonely', thoughts: ['I feel invisible', 'No one notices me'], behaviors: ['Refusing to engage with others', 'Staying silent'], sensations: ['Heavy limbs', 'Cold sensation in the chest'] },

    { name: 'Hurt', thoughts: ['That was painful', 'I can\'t believe they said that'], behaviors: ['Withdrawal', 'Quietness'], sensations: ['Stomach ache', 'Lump in the throat'] },
    { name: 'Hurt', thoughts: ['That really affected me', 'I can’t shake this'], behaviors: ['Avoiding contact', 'Isolating oneself'], sensations: ['Tightness in chest', 'Shaky voice'] },

    { name: 'Angry', thoughts: ['This is unfair!', 'Why is this happening to me?'], behaviors: ['Shouting', 'Slamming doors'], sensations: ['Pounding heart', 'Tense muscles'] },
    { name: 'Angry', thoughts: ['I\'m furious!', 'I can’t stand this'], behaviors: ['Raising voice', 'Throwing objects'], sensations: ['Clenched fists', 'Shaking'] },

    { name: 'Frustrated', thoughts: ['This is impossible', 'I\'ll never get it right'], behaviors: ['Clenching fists', 'Raising voice'], sensations: ['Tension in muscles', 'Heat in face'] },
    { name: 'Frustrated', thoughts: ['Nothing seems to be working', 'I’m tired of trying so hard'], behaviors: ['Pacing back and forth', 'Throwing hands in the air in defeat'], sensations: ['Headache from stress', 'Shaking hands or tapping feet'] },

    { name: 'Anxious', thoughts: ['What if something goes wrong?', 'I\'m not prepared'], behaviors: ['Pacing', 'Biting nails'], sensations: ['Tightness in chest', 'Sweating'] },
    { name: 'Anxious', thoughts: ['This situation is stressing me out', 'I can’t stop worrying about this'], behaviors: ['Rubbing hands', 'Checking surroundings constantly'], sensations: ['Shallow breathing', 'Knots in the stomach'] },

    { name: 'Helpless', thoughts: ['There’s nothing I can do', 'I have no control'], behaviors: ['Inaction', 'Seeking help from others'], sensations: ['Weakness in limbs', 'Mental fog'] },
    { name: 'Helpless', thoughts: ['I’m stuck', 'I feel powerless'], behaviors: ['Freezing', 'Avoiding decisions'], sensations: ['Heavy chest', 'Tiredness'] }
  ],

  hard: [
    { name: 'Joyful', thoughts: ['Life is beautiful', 'I\'m so grateful'], behaviors: ['Dancing', 'Hugging others'], sensations: ['Lightness in body', 'Tingling sensation'] },
    { name: 'Joyful', thoughts: ['This moment is pure happiness', 'Everything feels bright and full of love'], behaviors: ['Singing along with music', 'Engaging in playful activities'], sensations: ['Expansive feeling in the chest', 'Fast but steady heartbeat'] },

    { name: 'Proud', thoughts: ['I\'ve accomplished something amazing', 'I feel so good about myself'], behaviors: ['Standing tall', 'Smiling confidently'], sensations: ['Warm feeling in chest', 'Elevated energy'] },
    { name: 'Proud', thoughts: ['This was a major achievement', 'I feel on top of the world'], behaviors: ['Talking confidently', 'Engaging with others openly'], sensations: ['Strong posture', 'Buzzing energy in limbs'] },

    { name: 'Depressed', thoughts: ['Life feels pointless', 'I can’t escape this sadness'], behaviors: ['Loss of interest in daily activities', 'Staying in bed'], sensations: ['Low energy', 'Body feels heavy'] },
    { name: 'Depressed', thoughts: ['Nothing matters anymore', 'I feel completely lost'], behaviors: ['Avoiding all social interactions', 'Neglecting responsibilities'], sensations: ['Tiredness', 'Weight in chest and limbs'] },

    { name: 'Guilty', thoughts: ['I shouldn’t have done that', 'I’ve made a huge mistake'], behaviors: ['Apologizing repeatedly', 'Avoiding eye contact'], sensations: ['Sinking feeling in chest', 'Tightness in stomach'] },
    { name: 'Guilty', thoughts: ['I hurt someone, and I regret it deeply', 'I shouldn’t have said that'], behaviors: ['Staying silent', 'Looking down'], sensations: ['Heavy heart', 'Sinking feeling in stomach'] },

    { name: 'Furious', thoughts: ['I can’t stand this anymore!', 'This is outrageous!'], behaviors: ['Yelling', 'Throwing objects'], sensations: ['Red face', 'Throbbing temples'] },
    { name: 'Furious', thoughts: ['This is unacceptable!', 'I\'ve had enough!'], behaviors: ['Slamming doors', 'Aggressive actions'], sensations: ['Tight jaw', 'Fast, pounding heart'] },

    { name: 'Jealous', thoughts: ['They have what I want', 'That should be mine'], behaviors: ['Coldness towards the person', 'Passive-aggressive remarks'], sensations: ['Tense stomach', 'Tight chest'] },
    { name: 'Jealous', thoughts: ['I wish I had what they have', 'Why do they always succeed?'], behaviors: ['Avoiding interaction', 'Resentful glances'], sensations: ['Churning stomach', 'Heaviness in the heart'] },

    { name: 'Terrified', thoughts: ['Something terrible is going to happen', 'I’m in danger'], behaviors: ['Hiding', 'Running away'], sensations: ['Shaking', 'Cold sweats'] },
    { name: 'Terrified', thoughts: ['I can’t escape this', 'I’m absolutely powerless'], behaviors: ['Frozen in place', 'Rapid breathing'], sensations: ['Tight chest', 'Weakness in limbs'] },

    { name: 'Insecure', thoughts: ['I’m not good enough', 'They’re better than me'], behaviors: ['Avoiding eye contact', 'Speaking softly'], sensations: ['Shaky hands', 'Tightness in the stomach'] },
    { name: 'Insecure', thoughts: ['I can’t measure up', 'I’m failing'], behaviors: ['Shrinking posture', 'Apologizing often'], sensations: ['Weakness in limbs', 'Tight throat'] }
  ]
};
