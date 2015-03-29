using MVVM.Awesomium.AdvancedControl.ViewModelInfra;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MVVM.Awesomium.AdvancedControl.ViewModel
{
    public class MainViewModel : ViewModelBase
    {

        public MainViewModel()
        {
            Random rnd = new Random();

            Items = new ObservableCollection<ItemViewModel>();
            for (int i = 0; i < 200;i++ )
            {
                Items.Add(new ItemViewModel() { Imagepath = @"images\milesdavisbitchesbrew.jpeg", Big =  rnd.Next(0, 2)==1 });
                Items.Add(new ItemViewModel() { Imagepath = @"images\11a2a965-907c-4f2c-845e-e0c14df59e1c.bin", Big = rnd.Next(0, 2) == 1 });
                
            }
            Add = new RelayCommand(AddItems);
            Replace = new RelayCommand(DoReplace);
        }

        private void AddItems()
        {
            Random rnd = new Random();

            for (int i = 0; i < 200; i++)
            {
                Items.Add(new ItemViewModel() { Imagepath = @"images\milesdavisbitchesbrew.jpeg", Big = rnd.Next(0, 2) == 1 });
            }
        }

        private void DoReplace()
        {
            Random rnd = new Random();
            var myItems = new ObservableCollection<ItemViewModel>();
            for (int i = 0; i < 200; i++)
            {
                myItems.Add(new ItemViewModel() { Imagepath = @"images\milesdavisbitchesbrew.jpeg", Big = rnd.Next(0, 2) == 1 });
            }
            Items = myItems;
        }

        public ICommand Add { get; private set; }

        public ICommand Replace { get; private set; }

        private  ObservableCollection<ItemViewModel> _Items;
        public  ObservableCollection<ItemViewModel> Items
        {
            get { return _Items; }
            set { Set(ref _Items, value); }
        }
    }
}
