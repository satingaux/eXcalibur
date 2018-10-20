window.onload=function retrieve() {
  computation();
    //addFile();
}

var config = {
    apiKey: "AIzaSyCngEfCc4ZN5GGYXIw1h5w1ir6j1Oicf2U",
    authDomain: "letsjoinapool.firebaseapp.com",
    databaseURL: "https://letsjoinapool.firebaseio.com",
    projectId: "letsjoinapool",
    storageBucket: "letsjoinapool.appspot.com",
    messagingSenderId: "785993488579"
  };
  firebase.initializeApp(config);
  console.log("Cloud Firestores Loaded")
  var db = firebase.firestore();

  function computation(argument) {
    var modeList=['Bike','Car','Auto','Barefoot','Other'];
    modeList.forEach(function(mode_i){
    var dbCollection=db.collection(mode_i);
    dbCollection.get().then(res=>{
    console.log("ssa"+res.size);
  for(var i=1;i<=res.size;i++){
      var x=i*2; 
  dbCollection.limit(x).get().then( function (documentSnapshots) {
  var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  //console.log("last", lastVisible);
  dbCollection.limit(2)
          .startAfter(lastVisible)
          .get().then((querySnapshot)=>{
            includeMetadataChanges: true;
            querySnapshot.forEach((doc) => {
                                            console.log(`${doc.id} =>`, doc.data());
                                            addFile(doc,mode_i);});});
          // console.log("sachin"+mode_i)
           })
}//forloopends
});
});//modeforloopends
}//computaiton fun ends


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var fileId = 0; // used by the addFile() function to keep track of IDs
var evenOddColor =0;//alternate background color for rows

function addFile(data,mode) {
  console.log("addfile is called for"+mode);
    fileId++;
    if (evenOddColor==0) { var color = '';evenOddColor = 1;}
    else {var color = 'style="background-color: #f2f2f2;"';evenOddColor = 0;}
    var tile = '<tr '+color+'>'
      +'<td><b>'+mode+'</b>'//data.dest
      +'</td>'+
      '<td>'+data.data().date//data.dest
      +'</td>'+
      '<td>'+data.data().time//data.time
      +'</td>'+
      '<td>'+data.data().origin
      +'</td>'+
      '<td>'+data.data().destination//data.fractionFull
      +'</td>'+
      '<td>'+data.data().name
      +'</td>'+
      '<td>'+data.data().mobile
      +'</td>'+
      '<td>'+data.data().count
      +'</td>'+
      '<td><a onclick="'+"joinPage("+mode+")"+'"><i class="material-icons">person_add</i></a></td>'
    '</tr>';
  div = document.getElementById( 'join' );
    div.insertAdjacentHTML( 'beforeend', tile );
    console.log("special"+db.collection(mode).doc(db.collection(mode).id).count);
}
var Auto="Auto";
var Bike="Bike";
var Barefoot="Barefoot";
var Car="Car";
var Other="Other";

function joinPage(mode) {
  var id = db.collection(mode).doc().id;
  console.log("special"+id)
var x = db.collection(mode).doc(id)
x.update({
    count:(x.count+1)
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

}
// function joinPage(data,mode) {
// db.collection(mode).doc(.id).update({
//     count:(data.data().count+1)
// })
// .then(function() {
//     console.log("Document successfully updated!");
// })
// .catch(function(error) {
//     // The document probably doesn't exist.
//     console.error("Error updating document: ", error);
// });

// }
