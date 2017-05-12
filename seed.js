console.log ('This seed file is a-go!')
var db = require("./models");

var citiesList = [];
citiesList.push({
  name: 'San Francisco',
  country: 'United States',
  description: 'San Francisco, is the cultural, commercial, and financial \
                center of Northern California. It is the birthplace of the \
                United Nations. ',
  image: 'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/08/SANFRANCISCO.jpg',
  comments: []
});

citiesList.push({
  name: 'London',
  country: 'United Kingdom',
  description: 'London is the capital and most populous city of England \
                and the United Kingdom. London is a leading global city\
                in the arts, commerce, education, entertainment, fashion, \
                finance, healthcare, media, professional services, research and \
                development, tourism, and transportation.',
  image: 'https://static01.nyt.com/images/2015/12/09/travel/09intransitphoto-london/09intransitphoto-london-facebookJumbo.jpg',
  comments: []
});

citiesList.push({
  name: 'Gibraltar',
  country: 'United Kingdom',
  description: 'Gibraltar is a British Overseas Territory located on the southern end of the Iberian Peninsula.',
  image: 'http://www.visitgibraltar.gi/images/homepage_slider/df1aw_slide2.jpeg',
  comments: []
});




var commentsList = [];
commentsList.push({
  name: 'Sejin P.',
  text: 'San Francisco, or "San Fran kissco" as my 2 year old niece would say, is a wonderful city.  I have been here countless times and I can never get tired of the city has to offer!  This city has a lot of culture, I just love it!',
  date: '1434380293364',
  uid: '1',
  title: 'The Tourist in Me',
  city: 'San Francisco'
  });
commentsList.push({
  name: 'Sejin P.',
  text: 'For me, when I visited SF for the very first time someone broke into my car and stole my bag. I was heartbroken, girls can understand my pain better. That day I decided, I will never visit or move to this city again. But destiny had something else in store for me and I bumped into this city again or should I say job opportunity brought me to this city again. ',
  date: '1492000000000',
  uid: '2',
  title: 'Better think twice!',
  city: 'San Francisco'
  });
commentsList.push({
  name: 'Sejin P.',
  text: "San Francisco is an amazing city.  It is The City.  I came for the first time back in 2009 for my first week of training at my current job.  I'll never forget coming up from the Powell Street Station and being on Market Street.  Walking up Powell Street to the hotel.  Going to dinner and sitting in the Starlight Room looking out over the buildings and the hills and the pink skies.  That first week was amazing.  Monday night on Haight Street, Tuesday night on Columbus Avenue, Wednesday night in Chinatown, Thursday night in The Castro.  They days were spent going around to many different parts of The City - now places I see every day.  San Francisco has this energy that is hard to equal - because it is both intense and positive.  And, it's just a beautiful environment.",
  date: '1494380293369',
  uid: '3',
  title: 'SF the Amazing',
  city: 'San Francisco'
  });
commentsList.push({
  name: 'Sejin P.',
  text: 'I love London!',
  date: '1494380293369',
  uid: '3',
  title: 'Fish & Chips',
  city: 'London'
  });
commentsList.push({
  name: 'Sejin P.',
  text: 'London is a destination that you can continue to come back to again and again and continue to enjoy its delights.',
  date: '1494380293369',
  uid: '3',
  title: 'First time in London',
  city: 'London'
  });
  commentsList.push({
    name: 'Sejin P.',
    text: "London has gone from a food wasteland to a foodie's delight. Be sure to sample its international cuisines, including the explosion in fresh, local British cooking.",
    date: '1494380293369',
    uid: '3',
    title: 'Food Here is Amazing',
    city: 'London'
    });
commentsList.push({
  name: 'Sejin P.',
  text: 'Our trip to Gibraltar was very nice. The drive was relaxing and Paco was entertaining. One small thing which would be nice is to have Aqua available on the bus at a small charge. The caves are amazing and the time in town was plenty. We made new friends and shared lunch and conversation.',
  date: '1494380293369',
  uid: '3',
  title: '#bucketlist',
  city: 'Gibraltar'
  });
commentsList.push({
  name: 'Sejin P.',
  text: 'Big Ben! Fish & Chips! EYE',
  date: '149438223369',
  uid: '3',
  title: 'My favorite things to do in London',
  city: 'London'
  });
commentsList.push({
  name: 'Sejin P.',
  text: 'Gibraltar is most famous for The Rock of Gibraltar, a 426 meter high limestone rock rising out of the sea. The rock can be seen for many miles. It is home to the Barbary Apes, a type of tail-less monkey which are the only wild monkeys in Europe.',
  date: '1494380080369',
  uid: '3',
  title: 'Rock of Gibraltar',
  city: "Gibraltar"
  });
  commentsList.push({
    name: 'Sejin P.',
    text: 'This is one of the "must see attractions" of Gibraltar. It is definitely worth a visit and very beautiful caves which have been made very interesting.',
    date: '1494380080369',
    uid: '3',
    title: 'Good times were had',
    city: "Gibraltar"
    });


db.Comment.remove({}, function(err, comments) {
  console.log('removed all comments');
  db.Comment.create(commentsList, function(err, comments){
    console.log('created all comments');
    db.City.remove({}, function(err, cities) {
      citiesList.forEach(function (cityData) {
        var city = new db.City({
          name: cityData.name,
          country: cityData.country,
          description: cityData.description,
          image: cityData.image
        });
        db.Comment.find({city: cityData.name})
          .populate('comments')
          .exec (function(err, foundComments) {
            if (err) {
              console.log('err with db.comment.find', err)
            } else {
              city.comments = foundComments;
              city.save(function(err, savedCity) {
                console.log('city with ref comments successfully saved')
              })
            }
          })
        })
      })
    })
  })
