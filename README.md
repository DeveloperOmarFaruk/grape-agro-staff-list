# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<!-- Project Details Road Map -->
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<!-- Json Format -->

{
"staff": [
{
"staffId": "01736648160",
"name": "Md Omar Faruk Tutul",
"email": "omarfaruk18115@gmail.com",
"mobile": "0173664816000",
"id": 1
},
{
"staffId": "017366481602",
"name": "Md Omar Faruk Tutul",
"email": "omarfaruk18115@gmail.com",
"mobile": "01736648160",
"id": 2
},
{
"staffId": "017366481605",
"name": "Omar Faruk",
"email": "developer.omarfaruk@gmail.com",
"mobile": "01736648160",
"id": 3
},
{
"staffId": "0173664816044",
"name": "Omar Faruk",
"email": "developer.omarfaruk@gmail.com",
"mobile": "01736648160",
"id": 4
},
{
"staffId": "01521404561566",
"name": "Md. Omar Faruk",
"email": "developer.omarfaruk@gmail.com",
"mobile": "01521404561",
"id": 5
},
{
"staffId": "5665",
"name": "Md. Omar Faruk",
"email": "developer.omarfaruk@gmail.com",
"mobile": "01736648160",
"id": 6
},
{
"staffId": "017366481605563",
"name": "Omar Faruk",
"email": "developer.omarfaruk@gmail.com",
"mobile": "3363636536363",
"id": 7
}
]

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Staff Data load API call State and Function Area
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const [staff, SetStaff] = useState([]);

useEffect(() => {
async function getAllStaff() {
try {
const responesAllStaff = await axios.get(
`http://localhost:3030/staff/`
);
// console.log(responesStaff.data);
SetStaff(responesAllStaff.data);
} catch (error) {
console.log("Something is Wrong");
}
}
getAllStaff();
}, []);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Add Form State and Function Area
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const [staffAdd, setStaffAdd] = useState({
    staffId: "",
    name: "",
    email: "",
    mobile: "",

});

const [status, SetStatus] = useState();

function inputAddFormChange(e) {
setStaffAdd({
...staffAdd,
[e.target.name]: e.target.value,
});
}

async function onAddSubmit(e) {
e.preventDefault();
try {
await axios.post(`http://localhost:3030/staff`, staffAdd);
} catch (error) {
console.log("Something is Wrong");
}
setAddShow(false);
SetStatus(true);
}

    if (status) {
    return <Home />;

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// User specific id select for use
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { id } = useParams();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// back to path for use
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const navigate = useNavigate();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Edit Form State and Funcion Area
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const [staffEdit, setStaffEdit] = useState({
staffId: "",
name: "",
email: "",
mobile: "",
});

function inputEditFormChange(e) {
setStaffEdit({
...staffEdit,
[e.target.name]: e.target.value,
});
}

useEffect(() => {
async function getStaff() {
try {
const responesStaff = await axios.get(
`http://localhost:3030/staff/${id}`
);
// console.log(responesStaff.data);
setStaffEdit(responesStaff.data);
} catch (error) {
console.log("Something is Wrong");
}
}
getStaff();
}, [id]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Edit Form submit function
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function onEditSubmit(e) {
e.preventDefault();
try {
await axios.put(`http://localhost:3030/staff/${id}`, staffEdit);
} catch (error) {
console.log("Something is Wrong");
}

    navigate("/");

}

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// User specific id select for use
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { id } = useParams();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// back to path for use
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const navigate = useNavigate();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Staff Data load API call State and Function Area
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const [staff, SetStaff] = useState([]);

useEffect(() => {
async function getStaff() {
try {
const responesStaff = await axios.get(
`http://localhost:3030/staff/${id}`
);
// console.log(responesStaff.data);
SetStaff(responesStaff.data);
} catch (error) {
console.log("Something is Wrong");
}
}
getStaff();
}, [id]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ID pass
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<!-- <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes> -->
