#[allow(dead_code)]
pub struct MyHashMap {
    arr: Vec<(i32, i32)>,
}

/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
#[allow(dead_code)]
impl MyHashMap {
    /** Initialize your data structure here. */
    fn new() -> Self {
        MyHashMap { arr: vec![] }
    }

    /** value will always be non-negative. */
    fn put(&mut self, key: i32, value: i32) {
        let guess = self.arr.binary_search_by(|&item| item.0.cmp(&key));

        match guess {
            Ok(index) => self.arr[index] = (key, value),
            Err(index) => self.arr.insert(index, (key, value)),
        }
    }

    /** Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key */
    fn get(&self, key: i32) -> i32 {
        let res = self.arr.binary_search_by(|&item| item.0.cmp(&key));

        match res  {
          Ok(index) => self.arr[index].1,
          Err(_) => -1
        }

        
    }

    /** Removes the mapping of the specified value key if this map contains a mapping for the key */
    fn remove(&mut self, key: i32) {
        let guess = self.arr.binary_search_by(|&item| item.0.cmp(&key));

        match guess {
          Ok(index) => {
            self.arr.remove(index);
          },
          Err(_) => println!("{} is not in map", key)
        }
    }
}

#[cfg(test)]
mod tests {

    use crate::design_hash_map;
    #[test]
    fn test() {
        let mut map = design_hash_map::MyHashMap::new();

        map.put(0, 0);
        map.put(1, 1);
        map.get(0);
        map.remove(1);
    }
}


#[allow(dead_code)]
mod standard_solution {
    /// 结构体需要存储key，value。最好就是元组数据
    struct MyHashMap {
        mm: Vec<(i32, i32)>,
    }

    /**
     * `&self` means the method takes an immutable reference.
     * If you need a mutable reference, change it to `&mut self` instead.
     */
    impl MyHashMap {
        /** Initialize your data structure here. */
        fn new() -> Self {
            MyHashMap { mm: vec![] }
        }
        /** value will always be non-negative. */
        fn put(&mut self, key: i32, value: i32) {
            // 利用core::slice::binary_search_by方法，查找更快
            let p = self.mm.binary_search_by(|x| x.0.cmp(&key));
            match p {
                Ok(x) => self.mm[x].1 = value,
                Err(x) => self.mm.insert(x, (key, value)),
            }
        }
        /** Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key */
        fn get(&self, key: i32) -> i32 {
            let p = self.mm.binary_search_by(|x| x.0.cmp(&key));
            match p {
                Ok(x) => return self.mm[x].1,
                Err(_) => return -1,
            }
        }
        /** Removes the mapping of the specified value key if this map contains a mapping for the key */
        fn remove(&mut self, key: i32) {
            let p = self.mm.binary_search_by(|x| x.0.cmp(&key));
            match p {
                Ok(x) => {
                    self.mm.remove(x);
                }
                Err(_) => {}
            }
        }
    }
}
