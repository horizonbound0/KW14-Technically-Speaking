const newBlogButtonHandler = async (event) => {
    event.preventDefault();

    const newBlogModal = document.querySelector('.modal');

    newBlogModal.classList.toggle('is-active');
};

document
    .querySelector('.modalActivate')
    .addEventListener('click', newBlogButtonHandler);

document
    .querySelector('.modal-background')
    .addEventListener('click', newBlogButtonHandler);

document
    .querySelector('.delete')
    .addEventListener('click', newBlogButtonHandler);