const BlogCreate = document.querySelector(".create-blog");
const modal =document.querySelector(".modal");
const editModal =document.querySelector(".modal-edit");

const Publish=document.querySelector(".publish");
const Cancel =document.querySelector(".cancel");
const CloseEl =document.querySelector(".close");
const Topic=document.querySelector('#topic');
const desc=document.querySelector('#description');
const BlogEl =document.querySelector(".blog")

let BlogData=[];


function CreateModal(){
    modal.classList.remove('hide');

}


function CancelBlog() {
    Topic.value="";
    desc.value="";
    modal.classList.add('hide');
}


BlogCreate.addEventListener('click',CreateModal);

Cancel.addEventListener('click',CancelBlog)
CloseEl.addEventListener('click',CancelBlog)


function CreatePost(){
    const Title = document.getElementById("topic").value;
    const desc = document.getElementById("description").value;
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const createdAt = `Created At: ${date} at ${time}`;

    BlogData.push({
        id: BlogData.length + 1,
        title: Title,
        description: desc,
        createdAt

    });

    modal.classList.add('hide');

    showAllPosts();

    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
}

function editPost(id){
    editModal.classList.remove('hide');
    const blog = BlogData.find(s => s.id === id);

    document.getElementById("edit-topic").value = blog.title;
    document.getElementById("edit-description").value = blog.description;

    document.getElementById("edit-post-button").setAttribute("data", id);
    document.getElementById("delete-post-button").setAttribute("data", id);
}

function saveEditedPost() {
    const id = Number(document.getElementById("edit-post-button").getAttribute("data"));
    const title = document.getElementById("edit-topic").value;
    const description = document.getElementById("edit-description").value;
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const createdAt = `Last updated At: ${date} at ${time}`;

    BlogData.find(s => s.id === id).title = title;
    BlogData.find(s => s.id === id).description = description;
    BlogData.find(s => s.id === id).createdAt = createdAt;

    editModal.classList.add('hide');

    showAllPosts();

    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
}

function DeletePost(id){
    let blogId = id;

    if(!blogId)
        blogId = Number(document.getElementById("delete-post-button").getAttribute("data"));

    BlogData = BlogData.filter(s => s.id !== blogId);

    editModal.classList.add('hide');
    showAllPosts();

}
function closeBtn()
{
   
    editModal.classList.add('hide');
    showAllPosts();
}
function showAllPosts(){
    const showPostWrapper = document.getElementById("showPost");

    showPostWrapper.innerHTML = "";

    BlogData.map((blog) => {

        showPostWrapper.innerHTML += `
        <div class="blogItems">
        <div class="titleName">${blog.title}</div>
        <div class="DescName">${blog.description}</div>
        <div class=btnTime>
        <div>
        <button style="height: 30px; width: 120px; border: 1px solid #FFFFFF; background-color: #111111; color: #E3E3E3;" class="editButton" onclick="editPost(${blog.id})">Edit Post</button>
        <button style="height: 30px; width: 120px; border: 1px solid #FFFFFF; background-color: #111111; color: #E3E3E3;" onclick="DeletePost(${blog.id})">Delete Post</button>
        </div>
        
        <div> ${blog.createdAt}  </div>
        </div>
        </div>
        `;
    });
}