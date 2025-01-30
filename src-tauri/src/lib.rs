#[tauri::command]
fn test_command() -> String {
    println!("I was invoked from JavaScript!");
    "HELLO FRONTEND, THIS IS RUST SPEAKING".to_owned()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![test_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
