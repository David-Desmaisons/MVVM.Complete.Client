using MVVM.Awesomium.AdvancedControl.ViewModelInfra;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Input;

namespace MVVM.Awesomium.AdvancedControl.ViewModel
{
    public class ItemViewModel : ViewModelBase
    {
        public ItemViewModel()
        {
            Toggle = new RelayCommand(() => Big = !Big);
        }

        public ICommand Toggle { get; private set; }

        private string _Imagepath;
        public string Imagepath
        {
            get { return _Imagepath; }
            set { Set(ref _Imagepath, value); }
        }

        private bool _Big = false;
        public bool Big 
        {
            get { return _Big; }
            set { Set(ref _Big, value); }
        }
    }
}
