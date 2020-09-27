#![no_std] // 不使用标准库
#![no_main] // 禁用入口

use core::panic::PanicInfo;

// 命名固定 操作系统入口函数 C系标准
static HELLO: &[u8] = b"Mia San Mia";

#[no_mangle]
pub extern "C" fn _start() -> ! {
    let vga_buffer = 0xb8000 as *mut u8;

    for (i, &byte) in HELLO.iter().enumerate() {
        unsafe {
            *vga_buffer.offset(i as isize * 2) = byte;
            *vga_buffer.offset(i as isize * 2 + 1) = 0xb;
        }
    }

    loop {}
}

// 实现panic处理
#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}