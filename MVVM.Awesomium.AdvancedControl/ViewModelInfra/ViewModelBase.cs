using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MVVM.Awesomium.AdvancedControl.ViewModelInfra
{
    public class ViewModelBase : INotifyPropertyChanged
    {
        protected bool Set<T>(ref T property, T value, [CallerMemberName] string PropertyName=null)
        {
            if (object.Equals(property,value))
                return false;

            property = value;

            if (PropertyChanged != null)
                PropertyChanged(this, new PropertyChangedEventArgs(PropertyName));

            return true;
        }
    
        public event PropertyChangedEventHandler PropertyChanged;
    }
}

