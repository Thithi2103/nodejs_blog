const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const path = require('path');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middleware/SortMiddleware');


// Method Overrides
app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware);


// Connect to DB
db.connect()

app.use(morgan('combined'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  }),
);

app.engine(
  '.hbs', 
  engine({
  extname: '.hbs',
  helpers: {
    // Function to do basic mathematical operation in handlebar
    math: function (lvalue, operator, rvalue) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);
      return {
            '+': lvalue + rvalue,
            '-': lvalue - rvalue,
            '*': lvalue * rvalue,
            '/': lvalue / rvalue,
            '%': lvalue % rvalue
    }[operator];
  },

    sortable: (field, sort) => {

      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending',
      }

      const types = {
        default: 'asc',
        asc: 'desc',
        desc: 'asc',
      }
      const icon = icons[sortType];
      const type = types[sortType];

      return ` 
        <a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}"></span>
        </a>
     `;
    }
}
}));



app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);




app.listen(port, () => {
  console.log(` App listening on port http://localhost:${port}`);
});
