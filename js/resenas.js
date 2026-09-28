const reviewForm = document.querySelector('#review-form');
const reviewList = document.querySelector('#reviews-list');
const reviewStatus = document.querySelector('#review-status');
const reviewFeedback = document.querySelector('#form-feedback');
const ratingInput = document.querySelector('#review-rating');
const ratingButtons = [...document.querySelectorAll('.rating-stars button')];

function setRating(value) {
    ratingInput.value = String(value);
    ratingButtons.forEach((button) => {
        const selected = Number(button.dataset.rating) <= value;
        button.classList.toggle('is-selected', selected);
        button.setAttribute('aria-pressed', String(Number(button.dataset.rating) === value));
    });
}

ratingButtons.forEach((button) => {
    button.addEventListener('click', () => setRating(Number(button.dataset.rating)));
});

function createReviewCard(review) {
    const article = document.createElement('article');
    article.className = 'review-card';

    const top = document.createElement('div');
    top.className = 'review-card-top';
    const name = document.createElement('h3');
    name.textContent = review.nombre_cliente;
    const date = document.createElement('time');
    const createdAt = new Date(review.created_at);
    if (!Number.isNaN(createdAt.getTime())) {
        date.dateTime = createdAt.toISOString();
        date.textContent = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short', year: 'numeric' }).format(createdAt);
    }
    top.append(name, date);

    const stars = document.createElement('div');
    stars.className = 'review-card-stars';
    stars.setAttribute('aria-label', `${review.calificacion} de 5 estrellas`);
    stars.textContent = `${'★'.repeat(review.calificacion)}${'☆'.repeat(5 - review.calificacion)}`;
    const comment = document.createElement('p');
    comment.textContent = review.comentario;
    article.append(top, stars, comment);
    return article;
    }

    async function loadReviews() {
    if (!window.nativoSupabaseConfigured) {
        reviewList.innerHTML = '<p class="review-empty">Las reseñas aparecerán aquí cuando conectes Supabase y se aprueben desde el panel.</p>';
        reviewStatus.textContent = 'Modo demostración: conecta Supabase para publicar y consultar reseñas.';
        return;
    }

    const { data, error } = await window.nativoSupabase
        .from('resenas')
        .select('nombre_cliente, calificacion, comentario, created_at')
        .eq('aprobada', true)
        .order('created_at', { ascending: false })
        .limit(12);

    if (error) {
        reviewList.innerHTML = '<p class="review-empty">No pudimos cargar las reseñas ahora. Vuelve a intentarlo más tarde.</p>';
        reviewStatus.textContent = '';
        console.error('Error al cargar reseñas:', error.message);
        return;
    }

    if (!data?.length) {
        reviewList.innerHTML = '<p class="review-empty">Aún no hay reseñas publicadas. Puedes ser la primera persona en compartir tu experiencia.</p>';
        return;
    }

    reviewList.replaceChildren(...data.map(createReviewCard));
    }

    reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    reviewFeedback.className = 'form-feedback';
    reviewFeedback.textContent = '';

    if (!window.nativoSupabaseConfigured) {
        reviewFeedback.classList.add('is-error');
        reviewFeedback.textContent = 'El envío estará disponible cuando se configure Supabase.';
        return;
    }

    const formData = new FormData(reviewForm);
    const nombre = String(formData.get('nombre_cliente') || '').trim();
    const comentario = String(formData.get('comentario') || '').trim();
    const calificacion = Number(ratingInput.value);
    if (nombre.length < 2 || nombre.length > 60 || comentario.length === 0 || comentario.length > 500 || calificacion < 1 || calificacion > 5) {
        reviewFeedback.classList.add('is-error');
        reviewFeedback.textContent = 'Completa tu nombre, comentario y calificación antes de enviar.';
        return;
    }

    const submitButton = reviewForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando…';
    const { error } = await window.nativoSupabase.from('resenas').insert({
        nombre_cliente: nombre,
        calificacion,
        comentario,
        aprobada: false
    });
    submitButton.disabled = false;
    submitButton.innerHTML = 'Enviar reseña <span aria-hidden="true">↗</span>';

    if (error) {
        reviewFeedback.classList.add('is-error');
        reviewFeedback.textContent = 'No se pudo enviar tu reseña. Inténtalo de nuevo en un momento.';
        console.error('Error al enviar reseña:', error.message);
        return;
    }

    reviewForm.reset();
    setRating(0);
    reviewFeedback.classList.add('is-success');
    reviewFeedback.textContent = '¡Gracias! Tu reseña quedó pendiente de moderación.';
    });

loadReviews();