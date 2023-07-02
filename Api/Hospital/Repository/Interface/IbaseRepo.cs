namespace Hospital.Repository.Interface
{
    public interface IbaseRepo<K, T>
    {
        T Add(T item);
        T Get(K key);
    }
}
