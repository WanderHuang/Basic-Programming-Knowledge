#![no_std] // 不使用标准库
#![no_main] // 禁用入口

use core::panic::PanicInfo;

// vag 文本缓冲区
mod vga_buffer;

// 命名固定 操作系统入口函数 C系标准
// static HELLO: &[u8] = b"Mia San Mia";

#[no_mangle]
pub extern "C" fn _start() -> ! {
    // 直接向vga缓冲区刷数据
    // let vga_buffer = 0xb8000 as *mut u8;

    // for (i, &byte) in HELLO.iter().enumerate() {
    //     unsafe {
    //         *vga_buffer.offset(i as isize * 2) = byte;
    //         *vga_buffer.offset(i as isize * 2 + 1) = 0xb;
    //     }
    // }

    // 打印
    vga_buffer::print("Mia San Mia!\n", vga_buffer::Color::White, vga_buffer::Color::Blue);
    vga_buffer::print("{ FC Bayern }\n", vga_buffer::Color::White, vga_buffer::Color::Blue);

    use core::fmt::Write;
    vga_buffer::WRITER.lock().write_str("Hello again\n").unwrap();
    write!(vga_buffer::WRITER.lock(), ", some numbers: {} {}\n", 42, 1.337).unwrap();

    println!("Macro Function{}\n", "!");
    // panic!("Some panic message");

    loop {}
}

// 实现panic处理
#[panic_handler]
fn panic(info: &PanicInfo) -> ! {
    println!("{}", info);
    loop {}
}