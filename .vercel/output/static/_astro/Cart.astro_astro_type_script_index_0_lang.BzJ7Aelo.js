import{i as b,c as w,r as y,u as h,t as k,s as c,a as L}from"./cartStore.DL_C2AdO.js";const g=document.getElementById("cart-drawer"),r=document.getElementById("cart-backdrop"),E=document.getElementById("close-cart-btn"),l=document.getElementById("cart-items-container"),p=document.getElementById("cart-total"),m=document.getElementById("cart-subtotal"),e=document.getElementById("cart-shipping"),o=document.getElementById("free-shipping-hint");b.subscribe(n=>{n?(g?.classList.remove("translate-x-full"),r?.classList.remove("hidden"),setTimeout(()=>r?.classList.remove("opacity-0"),10),document.body.style.overflow="hidden"):(g?.classList.add("translate-x-full"),r?.classList.add("opacity-0"),setTimeout(()=>r?.classList.add("hidden"),300),document.body.style.overflow="")});function u(){b.set(!1)}E?.addEventListener("click",u);r?.addEventListener("click",u);function v(){p&&(p.textContent=k.get().toFixed(2)+"€"),m&&(m.textContent=c.get().toFixed(2)+"€");const n=L.get();e&&(n===0&&c.get()>0?(e.textContent="¡GRATIS!",e.classList.remove("text-brand-600"),e.classList.add("text-green-600")):n===0?(e.textContent="—",e.classList.remove("text-green-600"),e.classList.add("text-brand-600")):(e.textContent=n.toFixed(2)+"€",e.classList.remove("text-green-600"),e.classList.add("text-brand-600")));const t=c.get();if(o)if(t>0&&t<60){const a=(60-t).toFixed(2);o.textContent=`¡Añade ${a}€ más para envío gratis!`,o.classList.remove("hidden")}else t>=60?(o.textContent="✓ ¡Envío gratis aplicado!",o.classList.remove("hidden")):o.classList.add("hidden")}w.subscribe(n=>{l&&(n.length===0?(l.innerHTML=`
                <div class="flex flex-col items-center justify-center h-full text-stone-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-basket mb-4 opacity-50"><path d="m5 11 4-7"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"/><path d="m9 11 1 9"/><path d="m4.5 11 .1 9"/><path d="m15 11-1 9"/></svg>
                    <p>Tu cesta está vacía</p>
                    <button id="start-shopping-btn" class="mt-4 text-brand-600 hover:underline">Ver productos</button>
                </div>
            `,document.getElementById("start-shopping-btn")?.addEventListener("click",u),v()):(l.innerHTML=n.map(t=>`
                    <div class="flex gap-4 p-4 rounded-xl bg-brand-50/50 border border-brand-100/50 hover:border-brand-200 transition-colors">
                        <img src="${t.image}" alt="${t.name}" class="w-20 h-20 object-cover rounded-lg bg-stone-100" />
                        <div class="flex-1 flex flex-col justify-between">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-stone-800 line-clamp-1 text-sm">${t.name}</h3>
                                <button class="delete-btn text-stone-400 hover:text-red-500 transition-colors" data-id="${t.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                </button>
                            </div>
                            <div class="flex justify-between items-end">
                                <div class="flex items-center gap-3 bg-white rounded-lg p-1 border border-stone-200">
                                    <button class="quantity-btn p-1 text-stone-500 hover:text-stone-800 rounded hover:bg-stone-100" data-id="${t.id}" data-action="decrease">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                                    </button>
                                    <span class="text-sm font-bold w-4 text-center text-stone-700">${t.quantity}</span>
                                    <button class="quantity-btn p-1 text-stone-500 hover:text-stone-800 rounded hover:bg-stone-100" data-id="${t.id}" data-action="increase">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                    </button>
                                </div>
                                <span class="font-bold text-brand-600 text-sm">${(t.price*t.quantity).toFixed(2)}€</span>
                            </div>
                        </div>
                    </div>
                `).join(""),v(),document.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",a=>{const s=a.currentTarget?.getAttribute("data-id");s&&y(s)})}),document.querySelectorAll(".quantity-btn").forEach(t=>{t.addEventListener("click",a=>{const i=a.currentTarget;if(!i)return;const s=i.getAttribute("data-id"),x=i.getAttribute("data-action");if(!s)return;const d=n.find(f=>f.id===s);d&&(x==="increase"?h(s,d.quantity+1):h(s,d.quantity-1))})})))});
