const loadMore = async () => {
          try{
                const url = `https://openapi.programming-hero.com/api/news/categories`;
                const res = await fetch(url);
                const data = await res.json();
                displayNews(data.data.news_category);
            }
            catch(error){
                    console.log(error);
        }
    }
    const displayNews = catagories => {
        const catagoriesSection = document.getElementById('catagories')
        catagoriesSection.innerText = '';
        catagories.forEach(catagory => {
        //  console.log(catagory);
        const li = document.createElement('li');
        li.classList.add('catagory-list')
        li.innerHTML = `
       
        <h6 class="catagories-area" onclick="catagoryItems(${catagory.category_id})">${catagory.category_name}</h6>
        
        `;
        catagoriesSection.appendChild(li);
        });
    }
    const catagoryItems = async (id) => {
        try{
              const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
              const res = await fetch(url);
              const data = await res.json();
              displayCatagoryItems(data.data);
          }
          catch(error){
                  console.log(error);
      }
    }
    const displayCatagoryItems = catagories => {
      const catagoryItemsContainer = document.getElementById('catagory-items');
         catagoryItemsContainer.innerText = '';
        catagories.forEach(catagory => {
             console.log(catagory)
          const catagoryItems = document.createElement('div')
          catagoryItems.classList.add("row", "mb-4", "bg-white", "rounded")
          catagoryItems.innerHTML = `
         <div class="col-md-4">
         <img src="${catagory.image_url}" class="img-fluid rounded p-3" alt="...">
       </div>
       <div class="col-md-8">
         <div class="card-body">
            <h5 class="card-title pt-3 fw-bold">${catagory.title}</h5>
            <p class="card-text pt-4  text-secondary">${catagory.details.slice(0,300)}...</p>
            <div class="catagory-footer mt-4">
                <ul class="author-area">
                <li><img src="${catagory.author.img}"></li>
                <li><h6>${catagory.author.name ? catagory.author.name : 'N/A'}<span class="text-secondary">${catagory.author.published_date ? catagory.author.published_date : 'N/A'}</span></h6></li>
                </ul>
                <div class="viwer mt-3">
                  <i class="fa-regular fa-eye px-2"><span class="fw-bold"> ${catagory.total_view ? catagory.total_view : 'N/A'}</span></i>
                </div>
                <div class="ratings mt-3">
                    <ul>
                      <li><i class="fa-regular fa-star"></i></li>
                      <li><i class="fa-regular fa-star"></i></li>
                      <li><i class="fa-regular fa-star"></i></li>
                      <li><i class="fa-regular fa-star"></i></li>
                      <li><i class="fa-solid fa-star-half-stroke"></i></li>
                    </ul>
                  </div>
                  <a class="details mt-3" onclick="catagoryDetails()"><i class="fa-solid fa-arrow-right"></i><a>
            </div>
         </div>
       </div>
          `;
          catagoryItemsContainer.appendChild(catagoryItems);
    });
    }

     loadMore();