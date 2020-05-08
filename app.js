const transactions = document.querySelector('#transaction-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderTransaction(doc) {
    let li = document.createElement('li');
    let form = document.createElement('span');
    let department = document.createElement('span');
    let createdOn = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    department.textContent = doc.data().department;
    form.textContent = doc.data().form;
    createdOn.textContent = doc.data().createdOn;
    status.textContent = doc.data().status;
    cross.textContent = 'x';

    li.appendChild(form);
    li.appendChild(department);
    li.appendChild(createdOn);

    transactions.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('transactions').doc(id).delete();
    });
}


// // saving data
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     db.collection('cafes').add({
//         name: form.name.value,
//         city: form.city.value
//     });
//     form.name.value = '';
//     form.city.value = '';
// });

// real-time listener
db.collectionGroup("submittedforms").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            renderTransaction(change.doc);
        } else if (change.type == 'removed') {
            let li = transactions.querySelector('[data-id=' + change.doc.id + ']');
            transactions.removeChild(li);
        }
    });
});

// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });