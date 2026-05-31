import streamlit as st
import ollama
import time


def get_value(obj, key, default=None):
    if isinstance(obj, dict):
        return obj.get(key, default)
    return getattr(obj, key, default)

# Sayfa yapılandırması - Premium Görünüm
st.set_page_config(
    page_title="Ollama AI ",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# CSS ile özelleştirme (Görsellik için)
st.markdown("""
    <style>
    .main {
        background-color: #0e1117;
    }
    .stChatMessage {
        border-radius: 15px;
        margin-bottom: 10px;
    }
    .st-emotion-cache-1c7n2ka {
        background-color: #1e2129;
    }
    </style>
    """, unsafe_allow_html=True)

# Başlık ve Açıklama
st.title("🤖 Ollama / Aİ ")
st.markdown("---")

# Yan panel: Model seçimi ve Bilgiler
with st.sidebar:
    st.header("⚙️ Ayarlar")
    
    try:
        models_info = ollama.list()
        models = get_value(models_info, "models", [])
        model_names = [
            get_value(model, "name") or get_value(model, "model")
            for model in models
        ]
        model_names = [name for name in model_names if name]

        if model_names:
            selected_model = st.selectbox("Çalıştırılacak Modeli Seçin", model_names)
        else:
            st.warning("Henüz model indirilmemiş görünüyor.")
            st.code("ollama pull gemma3:1b", language="bash")
            selected_model = None
    except Exception as e:
        st.error("Ollama çalışmıyor veya model bulunamadı!")
        st.info("Lütfen Ollama'nın arka planda açık olduğundan emin olun.")
        selected_model = None

    st.markdown("---")
    st.subheader("📊 Model Bilgisi")
    if selected_model:
        try:
            model_details = ollama.show(selected_model)
            details = get_value(model_details, "details", {})
            with st.expander("Teknik Detaylar", expanded=True):
                st.info(f"**Model:** {selected_model}")
                if details:
                    st.write(f"**Format:** {get_value(details, 'format', 'N/A')}")
                    st.write(f"**Parametre:** {get_value(details, 'parameter_size', 'N/A')}")
                    st.write(f"**Quantization:** {get_value(details, 'quantization_level', 'N/A')}")
                st.write("---")
                st.caption("Bu veriler modelin nasıl optimize edildiğini gösterir (Sunumda bahsedebilirsin).")
        except Exception:
            st.info(f"Aktif Model: **{selected_model}**")
            st.write("Bu model tamamen yerel olarak kendi donanımınızda çalışmaktadır.")
    
    if st.button("Sohbeti Temizle", use_container_width=True):
        st.session_state.messages = []
        st.rerun()

# Sohbet geçmişini başlat
if "messages" not in st.session_state:
    st.session_state.messages = []

# Geçmiş mesajları ekrana yazdır
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Kullanıcı girişi
if prompt := st.chat_input("Yapay zekaya bir şeyler sorun..."):
    # Kullanıcı mesajını ekle
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Yapay zeka yanıtı
    if selected_model:
        with st.chat_message("assistant"):
            message_placeholder = st.empty()
            full_response = ""
            
            start_time = time.time()
            
            try:
                # Ollama üzerinden stream (akış) ile yanıt al
                response = ollama.chat(
                    model=selected_model,
                    messages=[{"role": m["role"], "content": m["content"]} for m in st.session_state.messages],
                    stream=True,
                )
                
                for chunk in response:
                    message = get_value(chunk, "message", {})
                    full_response += get_value(message, "content", "")
                    message_placeholder.markdown(full_response + "▌")
                
                end_time = time.time()
                duration = round(end_time - start_time, 2)
                
                message_placeholder.markdown(full_response)
                st.caption(f"⏱️ Yanıt süresi: {duration} saniye")
                
                # Yanıtı geçmişe ekle
                st.session_state.messages.append({"role": "assistant", "content": full_response})
                
            except Exception as e:
                st.error(f"Hata oluştu: {str(e)}")
    else:
        st.warning("Lütfen devam etmek için bir model seçin.")

# Alt bilgi
st.markdown("---")
st.caption("Ollama Presentation Demo - 2026")
