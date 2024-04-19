namespace corewebapiandangular.Models
{
    public class ResponceModel<T>
    {
        public int Status { get; set; }
        public T Data { get; set; }
        public string Description { get; set; }

    }
}
