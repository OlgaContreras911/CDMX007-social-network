/// CONSTANTES

const postStatus = document.getElementById("post-status");
const postButton = document.getElementById("post-button");
const printPost = document.getElementById("print-post");
const userLS = JSON.parse(localStorage.getItem('user'))
const db = firebase.firestore();

// INICIALIZADOR

const bd = firebase.firestore();
const postPublications = bd.collection('/wallPost').orderBy('created_at', "desc");
const muro = document.getElementById("wall")
postPublications.onSnapshot(querySnapshot => {
  let str = '';
  querySnapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data().name);
    if (userLS.uid === doc.data().uid) {
      if (doc.data().photo === null) {
        str += `      
          <div class="col s12 m7">
          <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
          <div class="card horizontal z-depth-3">
          <div class="c-i">
          <img class="user-photo"src="../imágenes/computer.png">
          </div>
          <div class="card-stacked">
          <div class="post">
          <p class="p-post">${doc.data().post}</p>
          </div>
          </div>
          </div>
          <button onclick="editPost('${doc.id}', '${doc.data().post}')" class="waves-effect waves-teal btn-flat edit-post">Editar</button>
         <button onclick="deletePost('${doc.id}')" class="waves-effect waves-teal btn-flat delete-post">Borrar</button>
          </div>`
      } else {
        str += `      
          <div class="col s12 m7">
    <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
    <div class="card horizontal z-depth-3">
    <div class="c-i">
    <img class="user-photo"src="${doc.data().photo}"> 
    </div>
    <div class="card-stacked">
    <div class="post">
    <p class="p-post">${doc.data().post}</p>
    </div>
    </div>
    </div>
    <button onclick="editPost('${doc.id}', '${doc.data().post}')" class="waves-effect waves-teal btn-flat edit-post">Editar</button>
         <button onclick="deletePost('${doc.id}')" class="waves-effect waves-teal btn-flat delete-post">Borrar</button>
    </div>`
      }
    } else {
      if (doc.data().photo === null) {
        str += `      
          <div class="col s12 m7">
          <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
            <div class="card horizontal z-depth-3">
              <div class="c-i">
               <img class="user-photo"src="../imágenes/computer.png">
              </div>
            <div class="card-stacked">
              <div class="post">
                <p class="p-post">${doc.data().post}</p>
              </div>
            </div>
          </div>
        </div>`
      } else {
        str += `      
        <div class="col s12 m7">
        <h4 class="header name-title">${doc.data().name}</h4>
          <div class="card horizontal z-depth-3">
            <div class="c-i">
            <img class="user-photo"src="${doc.data().photo}"> 
            </div>
          <div class="card-stacked">
            <div class="post">
              <p class="p-post">${doc.data().post}</p>
            </div>
          </div>
        </div>
      </div>`
      }
    }
  });
  muro.innerHTML = str
  // console.log(str)
});
//}

// EVENTOS - Listeners

postButton.addEventListener("click", () => {
  let str = ''
  const muro = document.getElementById("wall")
  let textToPost = postStatus.value;

  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      console.log(user)
      await db.collection("wallPost")
        .add({
          name: user.displayName,
          email: user.email,
          post: textToPost,
          photo: user.photoURL,
          uid: user.uid,
          created_at: firebase.firestore.Timestamp.fromDate(new Date())
        })

      // console.log(user)
      const bd = await firebase.firestore();
      const postPublications = await bd.collection('/wallPost')
        .orderBy('created_at', "desc")
      postPublications.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          if (user.uid === doc.data().uid) {
            if (doc.data().photo === null) {
              str += `      
            <div class="col s12 m7">
            <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
            <div class="card horizontal z-depth-3">
              <div class="c-i">
               <img class="user-photo"src="../imágenes/computer.png">
              </div>
            <div class="card-stacked">
              <div class="post">
                <p class="p-post">${doc.data().post}</p>
              </div>
            </div>
          </div>
          <button onclick="editPost('${doc.id}', '${doc.data().post}')" class="waves-effect waves-teal btn-flat edit-post">Editar</button>
          <button onclick="deletePost('${doc.id}')" class="waves-effect waves-teal btn-flat delete-post">Borrar</button>
        </div>`
            } else {
              str += `      
        <div class="col s12 m7">
        <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
          <div class="card horizontal z-depth-3">
            <div class="c-i">
            <img class="user-photo"src="${doc.data().photo}"> 
            </div>
          <div class="card-stacked">
            <div class="post">
              <p class="p-post">${doc.data().post}</p>
            </div>
          </div>
        </div>
        <button onclick="editPost('${doc.id}', '${doc.data().post}')" class="waves-effect waves-teal btn-flat edit-post">Editar</button>
        <button onclick="deletePost('${doc.id}')" class="waves-effect waves-teal btn-flat delete-post">Borrar</button>
      </div>`
            }
          } else {
            if (doc.data().photo === null) {
              str += `      
              <div class="col s12 m7">
              <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
                <div class="card horizontal z-depth-3">
                  <div class="c-i">
                   <img class="user-photo"src="../imágenes/computer.png">
                  </div>
                <div class="card-stacked">
                  <div class="post">
                    <p class="p-post">${doc.data().post}</p>
                  </div>
                </div>
              </div>
            </div>`
            } else {
              str += `      
            <div class="col s12 m7">
            <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
              <div class="card horizontal z-depth-3">
                <div class="c-i">
                <img class="user-photo"src="${doc.data().photo}"> 
                </div>
              <div class="card-stacked">
                <div class="post">
                  <p class="p-post">${doc.data().post}</p>
                </div>
              </div>
            </div>
          </div>`
            }

          }
        });
      });
    } else {
      console.log("No hay usuario loggeado")
    }
  });
  postStatus.value = '';
  muro.innerHTML = str
});

const deletePost=(id)=>{
  let sure =confirm("¿Deseas eliminar este mensaje?");
  if (sure) {
db.collection("/wallPost").doc(id).delete().then(()=> {
  console.log("Document successfully deleted!");
}).catch((error)=> {
  console.error("Error removing document: ", error);
});
}


}

const editPost=(id,textToPost)=>{
  postStatus.value= textToPost;
  postButton.innerHTML=`<i class="material-icons">cached</i>`;

  postButton.onclick =()=>{
    let socialRef = db.collection("/wallPost").doc(id);
     //var textToPost = postStatus.value;
    
    return socialRef.set({
      
      post: textToPost,
    })
    .then(()=> {
      console.log(socialRef.id);
    console.log("Document successfully updated!");
    postButton.innerHTML=`<i class="material-icons">add_circle_outline</i>`;
})
.catch((error)=> {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

  }
}

//funcionan los botones