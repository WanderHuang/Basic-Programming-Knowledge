# OS learning

This is a repo following `rust_os`.

## operations

- `cargo-xbuild`: cross built.
- `cargo-bootimage`: make a boot image.
- `qemu`: simulator of different system architectures;


### run in MacOS

`cargo xbuild`: build to binary code.
`cargo bootimage`: build to boot image.
`qemu-system-x86_64 -drive format=raw,file=target/x86_64-rust-os/debug/bootimage-rust-os.bin`: run your image in qemu.