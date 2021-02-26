# OS learning

This is a repo following [`rust_os`](https://github.com/phil-opp/blog_os).

## operations

需要安装这些包

- `cargo-xbuild`: cross built. 交叉编译。`cargo install cargo-xbuild`
- `cargo-bootimage`: make a boot image. `cargo install bootimage`
- `qemu`: simulator of different system architectures;


### run in MacOS

前置条件：`cargo-xbuild`、`bootimage`、`rustup component add llvm-tools-preview`、`qemu`

> [20210226] bootloader好似出问题了

1. `cargo xbuild`: build to binary code.
2. `cargo bootimage`: build to boot image.
3. `qemu-system-x86_64 -drive format=raw,file=target/x86_64-rust-os/debug/bootimage-rust-os.bin`: run your image in qemu.
